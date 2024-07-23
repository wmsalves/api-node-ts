import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Pessoas - GetAll", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getall-pessoas@gmail.com";
    await testServer
      .post("/register")
      .send({ email, password: "123456", name: "Teste" });
    const signInRes = await testServer
      .post("/login")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Teste" });

    cityId = resCidade.body;
  });

  it("Tenta consultar sem usar token de autenticação", async () => {
    const res1 = await testServer.get("/persons").send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Busca registros", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "jucagetall@gmail.com",
        fullName: "Juca silva",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
