import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface ICity {
  name: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(
    yup.object().shape({
      name: yup.string().required().min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  return res.status(StatusCodes.CREATED).json(1);
};
