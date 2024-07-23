import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cidades - GetAll", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getall-cidades@gmail.com";
    await testServer
      .post("/register")
      .send({ email, password: "123456", name: "Teste" });
    const signInRes = await testServer
      .post("/login")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Tenta consultar sem usar token de autenticação", async () => {
    const res1 = await testServer.get("/cities").send();
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Buscar todos os registros", async () => {
    const res1 = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Belo Horizonte" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
