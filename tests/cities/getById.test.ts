import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cidades - GetById", () => {
  it("Busca registro por id", async () => {
    const res1 = await testServer
      .post("/cities")
      .send({ nome: "Belo Horizonte" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const cityId = res1.body.id
    const resBuscada = await testServer.get(`/cities/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nome");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer.get("/cities/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
