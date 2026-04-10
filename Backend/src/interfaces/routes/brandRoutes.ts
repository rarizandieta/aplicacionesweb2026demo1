import { Router } from "express";
import { BrandController } from "../controllers/BrandController";

const router = Router();
const ctrl = new BrandController();

router.get("/brands", ctrl.getAll.bind(ctrl));
router.get("/brands/:id", ctrl.getById.bind(ctrl));
router.post("/brands", ctrl.create.bind(ctrl));
router.put("/brands/:id", ctrl.update.bind(ctrl));
router.delete("/brands/:id", ctrl.delete.bind(ctrl));

export default router;
