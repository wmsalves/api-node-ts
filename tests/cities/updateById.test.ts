import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {
  it("Atualiza registro", async () => {
    const res1 = await testServer
      .post("/cities")
      .send({ nome: "Belo Horizonte" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/cities/${res1.body}`)
      .send({ nome: "Belo" });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/cities/99999").send({ nome: "Belo" });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
