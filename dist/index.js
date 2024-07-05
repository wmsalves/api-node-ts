"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
server_1.server.listen(3000, () => {
    console.log(`Server is running on port: ${3000}`);
});
