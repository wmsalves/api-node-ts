"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const middlewares_1 = require("../shared/middlewares");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    return res.send("Hello World");
});
router.get("/cities", middlewares_1.ensureAuthenticaded, controllers_1.CitiesController.getAllValidation, controllers_1.CitiesController.getAll);
router.post("/cities", middlewares_1.ensureAuthenticaded, controllers_1.CitiesController.createValidation, controllers_1.CitiesController.create);
router.get("/cities/:id", middlewares_1.ensureAuthenticaded, controllers_1.CitiesController.getByIdValidation, controllers_1.CitiesController.getById);
router.put("/cities/:id", middlewares_1.ensureAuthenticaded, controllers_1.CitiesController.updateByIdValidation, controllers_1.CitiesController.updateById);
router.delete("/cities/:id", middlewares_1.ensureAuthenticaded, controllers_1.CitiesController.deleteByIdValidation, controllers_1.CitiesController.deleteById);
router.get("/persons", middlewares_1.ensureAuthenticaded, controllers_1.PersonController.getAllValidation, controllers_1.PersonController.getAll);
router.post("/persons", middlewares_1.ensureAuthenticaded, controllers_1.PersonController.createValidation, controllers_1.PersonController.create);
router.get("/persons/:id", middlewares_1.ensureAuthenticaded, controllers_1.PersonController.getByIdValidation, controllers_1.PersonController.getById);
router.put("/persons/:id", middlewares_1.ensureAuthenticaded, controllers_1.PersonController.updateByIdValidation, controllers_1.PersonController.updateById);
router.delete("/persons/:id", middlewares_1.ensureAuthenticaded, controllers_1.PersonController.deleteByIdValidation, controllers_1.PersonController.deleteById);
router.post("/login", controllers_1.UsersController.signInValidation, controllers_1.UsersController.signIn);
router.post("/register", controllers_1.UsersController.signUpValidation, controllers_1.UsersController.signUp);
//# sourceMappingURL=main.js.map