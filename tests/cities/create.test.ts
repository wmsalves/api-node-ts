import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-cities@gmail.com";
    await testServer
      .post("/register")
      .send({ name: "Teste", email, password: "123456" });
    const signInRes = await testServer
      .post("/login")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Tenta criar registro sem token de acesso", async () => {
    const res1 = await testServer
      .post("/cities")
      .send({ name: "Belo Horizonte" });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Criar registro", async () => {
    const res1 = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Belo Horizonte",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar um registro com nome muito curto", async () => {
    const res1 = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Be" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
