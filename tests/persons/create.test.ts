import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Pessoas - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-pessoas@gmail.com";
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

  it("Criar sem usar token de autenticação", async () => {
    const res1 = await testServer.post("/persons").send({
      cityId: 1,
      email: "juca@gmail.com",
      fullName: "Juca silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "juca@gmail.com",
        fullName: "Juca silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Cadastra registro 2", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: "Juca silva",
        email: "juca2@gmail.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Tenta criar registro com email duplicado", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: "Juca silva",
        email: "jucaduplicado@gmail.com",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const res2 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "jucaduplicado@gmail.com",
        fullName: "duplicado",
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });
  it("Tenta criar registro com nome completo muito curto", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "juca@gmail.com",
        fullName: "Ju",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.fullName");
  });
  it("Tenta criar registro sem nome completo", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "juca@gmail.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.fullName");
  });
  it("Tenta criar registro sem email", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: "Juca da Silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Tenta criar registro com email inválido", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "juca gmail.com",
        fullName: "Juca da Silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Tenta criar registro sem cidadeId", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        email: "juca@gmail.com",
        fullName: "Juca da Silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cityId");
  });
  it("Tenta criar registro com cidadeId inválido", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId: "teste",
        email: "juca@gmail.com",
        fullName: "Juca da Silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cityId");
  });
  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
    expect(res1.body).toHaveProperty("errors.body.cityId");
    expect(res1.body).toHaveProperty("errors.body.fullName");
  });
});
