import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAuthenticaded: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  console.log(req.header);
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Não autenticado." },
    });
  }

  const [type, token] = authorization.split("");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Não autenticado." },
    });
  }

  if (token !== "teste.teste.teste") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Não autenticado." },
    });
  }

  return next();
};
