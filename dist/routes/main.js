"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    return res.send("Hello World");
});
router.post("/cities", controllers_1.CitiesController.createBodyValidator, controllers_1.CitiesController.createValidation, controllers_1.CitiesController.create);
