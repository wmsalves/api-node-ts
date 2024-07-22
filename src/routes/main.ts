import { Router } from "express";
import {
  CitiesController,
  PersonController,
  UsersController,
} from "./../controllers";
import { ensureAuthenticaded } from "../shared/middlewares";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Hello World");
});

router.get(
  "/cities",
  ensureAuthenticaded,
  CitiesController.getAllValidation,
  CitiesController.getAll
);
router.post(
  "/cities",
  ensureAuthenticaded,
  CitiesController.createValidation,
  CitiesController.create
);
router.get(
  "/cities/:id",
  ensureAuthenticaded,
  CitiesController.getByIdValidation,
  CitiesController.getById
);
router.put(
  "/cities/:id",
  ensureAuthenticaded,
  CitiesController.updateByIdValidation,
  CitiesController.updateById
);
router.delete(
  "/cities/:id",
  ensureAuthenticaded,
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById
);

router.get(
  "/persons",
  ensureAuthenticaded,
  PersonController.getAllValidation,
  PersonController.getAll
);
router.post(
  "/persons",
  ensureAuthenticaded,
  PersonController.createValidation,
  PersonController.create
);
router.get(
  "/persons/:id",
  ensureAuthenticaded,
  PersonController.getByIdValidation,
  PersonController.getById
);
router.put(
  "/persons/:id",
  ensureAuthenticaded,
  PersonController.updateByIdValidation,
  PersonController.updateById
);
router.delete(
  "/persons/:id",
  ensureAuthenticaded,
  PersonController.deleteByIdValidation,
  PersonController.deleteById
);

router.post(
  "/login", 
  UsersController.signInValidation, 
  UsersController.signIn);
router.post(
  "/register",
  UsersController.signUpValidation,
  UsersController.signUp
);

export { router };
