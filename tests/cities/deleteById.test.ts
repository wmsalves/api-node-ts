import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cidades - DeleteById", () => {
  it("Apaga registro", async () => {
    const res1 = await testServer
      .post("/cities")
      .send({ name: "Belo Horizonte" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/cities/${res1.body}`).send();

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/cities/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
