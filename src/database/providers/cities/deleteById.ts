// src/database/providers/cities/deleteById.ts
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cities).where("id", "=", id).del();
    if (result > 0) return;

    return new Error("Erro ao tentar apagar o registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao tentar apagar o registro.");
  }
};
