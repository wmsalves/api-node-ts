import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Pessoas - UpdateById", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "updatebyid-pessoas@gmail.com";
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

  it("Atualiza registro", async () => {
    const res1 = await testServer
      .post("/persons")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: "Juca silva",
        email: "jucaupdate@gmail.com",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/persons/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: "Juca silva",
        email: "jucaupdates@gmail.com",
      });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/persons/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "juca@gmail.com",
        fullName: "Juca silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
