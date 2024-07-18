import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

import { PersonProvider } from "./../../database/providers/persons";
import { validation } from "../../shared/middlewares";
import { IPerson } from "./../../database/models";

interface IBodyProps extends Omit<IPerson, "id"> {}

export const createValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      cityId: yup.number().integer().required(),
      fullName: yup.string().required().min(3),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await PersonProvider.create(req.body);

  if (result instanceof Error) {
    console.log(Error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
