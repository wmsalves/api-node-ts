import knex from "knex";
import { ETableNames } from "../../ETableNames";
import { ICity } from "../../models";

export const create = async (
  city: Omit<ICity, "id">
): Promise<number | Error> => {
  try {
    const [result] = await knex(ETableNames.cities)
      .insert(city)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    return new Error("Erro ao cadastrar o registro");
  }
};
