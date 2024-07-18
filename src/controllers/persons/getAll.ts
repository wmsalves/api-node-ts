import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { PersonProvider } from "./../../database/providers/persons";
import { validation } from "../../shared/middlewares";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}
export const getAllValidation = validation((get) => ({
  query: get<IQueryProps>(
    yup.object().shape({
      filter: yup.string().notRequired().default(""),
      page: yup.number().integer().notRequired().moreThan(0).default(1),
      limit: yup.number().integer().notRequired().moreThan(0).default(7),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const result = await PersonProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || ""
  );
  const count = await PersonProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(result);
};
