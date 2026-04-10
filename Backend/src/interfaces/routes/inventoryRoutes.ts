import { Router } from "express";
import { InventoryController } from "../controllers/InventoryController";

const router = Router();
const ctrl = new InventoryController();

router.get("/inventory/low-stock", ctrl.getLowStock.bind(ctrl));
router.get("/inventory", ctrl.getAll.bind(ctrl));
router.get("/inventory/:productId", ctrl.getByProductId.bind(ctrl));
router.post("/inventory/:productId", ctrl.upsert.bind(ctrl));
router.put("/inventory/:productId", ctrl.upsert.bind(ctrl));

export default router;
