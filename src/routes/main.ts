import { Router } from "express";
import { CitiesController, PersonController } from "./../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Hello World");
});

router.get(
  "/cities",
  CitiesController.getAllValidation,
  CitiesController.getAll
);
router.post(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);
router.get(
  "/cities/:id",
  CitiesController.getByIdValidation,
  CitiesController.getById
);
router.put(
  "/cities/:id",
  CitiesController.updateByIdValidation,
  CitiesController.updateById
);
router.delete(
  "/cities/:id",
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById
);

router.get(
  "/persons",
  PersonController.getAllValidation,
  PersonController.getAll
);
router.post(
  "/persons",
  PersonController.createValidation,
  PersonController.create
);
router.get(
  "/persons/:id",
  PersonController.getByIdValidation,
  PersonController.getById
);
router.put(
  "/persons/:id",
  PersonController.updateByIdValidation,
  PersonController.updateById
);
router.delete(
  "/persons/:id",
  PersonController.deleteByIdValidation,
  PersonController.deleteById
);

export { router };
