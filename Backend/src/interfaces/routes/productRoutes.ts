import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const ctrl = new ProductController();

router.get("/products", ctrl.getAll.bind(ctrl));
router.get("/products/:id", ctrl.getById.bind(ctrl));
router.post("/products", ctrl.create.bind(ctrl));
router.put("/products/:id", ctrl.update.bind(ctrl));
router.delete("/products/:id", ctrl.delete.bind(ctrl));

export default router;
