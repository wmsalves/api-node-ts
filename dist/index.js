"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
