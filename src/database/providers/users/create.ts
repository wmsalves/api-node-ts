import { ETableNames } from "../../ETableNames";
import { IUser } from "../../models";
import { Knex } from "../../knex";
import { PasswordCryto } from "../../../shared/services";

export const create = async (
  user: Omit<IUser, "id">
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCryto.hashPassword(user.password);

    const [result] = await Knex(ETableNames.user)
      .insert({ ...user, password: hashedPassword })
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
