import { Request, response, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../../database/models";
import { UsersProvider } from "../../database/providers/users";
import { PasswordCryto } from "../../shared/services";

interface IBodyProps extends Omit<IUser, "id" | "name"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      password: yup.string().required().min(6),
      email: yup.string().required().email().min(6),
    })
  ),
}));

export const signIn = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { email, password } = req.body;
  const result = await UsersProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são incorretos.",
      },
    });
  }

  const passwordMatch = await PasswordCryto.verifyPassword(
    password,
    result.password
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são incorretos.",
      },
    });
  } else {
    return res
      .status(StatusCodes.OK)
      .json({ accessToken: "teste.teste.teste" });
  }
};
