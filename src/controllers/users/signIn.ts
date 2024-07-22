import { Request, response, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../../database/models";
import { UsersProvider } from "../../database/providers/users";
import { JWTService, PasswordCryto } from "../../shared/services";

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
  const user = await UsersProvider.getByEmail(email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são incorretos.",
      },
    });
  }

  const passwordMatch = await PasswordCryto.verifyPassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são incorretos.",
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: user.id });
    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Error ao gerar o token de acesso.",
        },
      });
    }

    return res
      .status(StatusCodes.OK)
      .json({ accessToken });
  }
};
