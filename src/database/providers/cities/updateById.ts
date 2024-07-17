import { ETableNames } from "../../ETableNames";
import { ICity } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  cities: Omit<ICity, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cities)
      .update(cities)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
