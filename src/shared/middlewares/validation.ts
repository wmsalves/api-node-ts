import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TValidation = (
  field: "body" | "header" | "params" | "query",
  scheme: Schema<any>
) => RequestHandler;

export const validation: TValidation =
  (field, scheme) => async (req, res, next) => {
    try {
      await scheme.validate(req[field], {
        abortEarly: false,
      });
      return next();
    } catch (err) {
      const yupError = err as ValidationError;
      // record é um objeto que possui chaves de um tipo especifico e valores de outro tipo especifico
      const errors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (error.path === undefined) return;
        // atribuindo mensagem de erro ao erro mapeado
        errors[error.path] = error.message;
      });

      return res.status(StatusCodes.BAD_REQUEST).json({
        errors,
      });
    }
  };
