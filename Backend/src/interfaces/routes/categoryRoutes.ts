import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const router = Router();
const ctrl = new CategoryController();

router.get("/categories", ctrl.getAll.bind(ctrl));
router.get("/categories/:id", ctrl.getById.bind(ctrl));
router.post("/categories", ctrl.create.bind(ctrl));
router.put("/categories/:id", ctrl.update.bind(ctrl));
router.delete("/categories/:id", ctrl.delete.bind(ctrl));

export default router;
