import express from "express";
import "./shared/services/translationsYup";
import { router } from "./routes/main";
import "dotenv/config";

const server = express();

server.use(express.json());
server.use(router);

export { server };
