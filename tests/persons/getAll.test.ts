import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Pessoas - GetAll", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cities").send({ name: "Teste" });

    cityId = resCidade.body;
  });

  it("Busca registros", async () => {
    const res1 = await testServer.post("/persons").send({
      cityId,
      email: "wemerson@maxtrack.com",
      fullName: "Wemerson Alves",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/persons").send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
