import supertest from "supertest";
import { server } from "../src/server.ts";

export const testServer = supertest(server);
