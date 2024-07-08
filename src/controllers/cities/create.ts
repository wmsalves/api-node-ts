import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICity {
  name: string;
  state: string;
}
const bodyValidation: yup.ObjectSchema<ICity> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

interface IFilter {
  filter?: string;
}

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});
export const createBodyValidator = validation("body", bodyValidation);
export const createValidation = validation("query", queryValidation);

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  console.log(req.body);
  return res.send("Create!");
};
