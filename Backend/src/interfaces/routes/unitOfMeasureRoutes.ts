import { Router } from "express";
import { UnitOfMeasureController } from "../controllers/UnitOfMeasureController";

const router = Router();
const ctrl = new UnitOfMeasureController();

router.get("/units-of-measure", ctrl.getAll.bind(ctrl));
router.get("/units-of-measure/:id", ctrl.getById.bind(ctrl));
router.post("/units-of-measure", ctrl.create.bind(ctrl));
router.put("/units-of-measure/:id", ctrl.update.bind(ctrl));
router.delete("/units-of-measure/:id", ctrl.delete.bind(ctrl));

export default router;
