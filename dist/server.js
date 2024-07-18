"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
require("./shared/services/translationsYup");
const main_1 = require("./routes/main");
require("dotenv/config");
const server = (0, express_1.default)();
exports.server = server;
server.use(express_1.default.json());
server.use(main_1.router);
//# sourceMappingURL=server.js.map