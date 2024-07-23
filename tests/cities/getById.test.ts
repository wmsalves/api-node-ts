import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cidades - GetById", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getbyid-cidades@gmail.com";
    await testServer
      .post("/register")
      .send({ email, password: "123456", name: "Teste" });
    const signInRes = await testServer
      .post("/login")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Tenta consultar sem usar token de autenticação", async () => {
    const res1 = await testServer.get("/cities/1").send();
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Busca registro por id", async () => {
    const res1 = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Belo Horizonte" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/cities/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("name");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer
      .get("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
