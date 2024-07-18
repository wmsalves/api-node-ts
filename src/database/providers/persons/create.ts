import { ETableNames } from "../../ETableNames";
import { IPerson } from "../../models";
import { Knex } from "../../knex";

export const create = async (
  person: Omit<IPerson, "id">
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.person)
      .where("id", "=", person.cityId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada no cadastro não foi encontrada");
    }

    const [result] = await Knex(ETableNames.person)
      .insert(person)
      .returning("id");
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
