import { Router } from "express";
import { LocationController } from "../controllers/LocationController";

const router = Router();
const ctrl = new LocationController();

router.get("/locations", ctrl.getAll.bind(ctrl));
router.get("/locations/:id", ctrl.getById.bind(ctrl));
router.post("/locations", ctrl.create.bind(ctrl));
router.put("/locations/:id", ctrl.update.bind(ctrl));
router.delete("/locations/:id", ctrl.delete.bind(ctrl));

export default router;
