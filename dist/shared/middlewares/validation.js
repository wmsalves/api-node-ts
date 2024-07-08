"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const http_status_codes_1 = require("http-status-codes");
const validation = (field, scheme) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield scheme.validate(req[field], {
            abortEarly: false,
        });
        return next();
    }
    catch (err) {
        const yupError = err;
        // record é um objeto que possui chaves de um tipo especifico e valores de outro tipo especifico
        const errors = {};
        yupError.inner.forEach((error) => {
            if (error.path === undefined)
                return;
            // atribuindo mensagem de erro ao erro mapeado
            errors[error.path] = error.message;
        });
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors,
        });
    }
});
exports.validation = validation;
