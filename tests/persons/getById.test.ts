import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Pessoas - GetById", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getbyid-pessoas@gmail.com";
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
    const res1 = await testServer.get("/persons/1").send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Busca registro por id", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: "Juca silva",
        email: "jucagetbyid@gmail.com",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/persons/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("fullName");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer
      .get("/persons/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
