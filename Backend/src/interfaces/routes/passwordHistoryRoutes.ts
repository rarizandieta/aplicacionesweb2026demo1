import { Router } from "express";
import { PasswordHistoryController } from "../controllers/PasswordHistoryController";

const passwordHistoryController = new PasswordHistoryController();

export const passwordHistoryRoutes = Router();

passwordHistoryRoutes.get("/password-history/:id", (req, res) => passwordHistoryController.getPasswordHistories(req, res));
passwordHistoryRoutes.post("/password-history/:id", (req, res) => passwordHistoryController.addPasswordHistory(req, res));

export default passwordHistoryRoutes;
