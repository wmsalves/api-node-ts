"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.create = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const bodyValidation = yup.object().shape({
    name: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let validatedData = undefined;
    try {
        validatedData = yield bodyValidation.validate(req.body, {
            abortEarly: false,
        });
    }
    catch (error) {
        const yupError = error;
        // record é um objeto que possui chaves de um tipo especifico e valores de outro tipo especifico
        const validationErrors = {};
        yupError.inner.forEach((error) => {
            if (error.path === undefined)
                return;
            // atribuindo mensagem de erro ao erro mapeado
            validationErrors[error.path] = error.message;
        });
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: validationErrors,
        });
    }
    console.log(validatedData);
    return res.send("Create!");
});
exports.create = create;
