import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
  page?: number;
  limit?: number,
  filter?: string, 
}

export const getAllValidation = validation((getSchema) => ({
  body: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().notRequired().moreThan(0),
      limit: yup.number().notRequired().moreThan(0),
      filter: yup.string().required(),
    })
  ),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  console.log(req.query);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado.");
};
