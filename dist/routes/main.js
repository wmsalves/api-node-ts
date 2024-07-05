"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    return res.send("Hello World");
});
router.post('/test', (req, res) => {
    console.log(req.body);
    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(req.body);
});
