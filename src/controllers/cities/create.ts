import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICity {
  name: string;
  state: string;
}
interface IFilter {
  filter?: string;
}

export const createValidation = validation((getShema) => ({
  body: getShema<ICity>(
    yup.object().shape({
      name: yup.string().required().min(3),
      state: yup.string().required().min(3),
    })
  ),
  query: getShema<IFilter>(
    yup.object().shape({
      filter: yup.string().required().min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  console.log(req.body);
  return res.send("Create!");
};
