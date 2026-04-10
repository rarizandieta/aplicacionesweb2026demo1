import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authController = new AuthController();

export const authRoutes = Router();

authRoutes.post("/login", (req, res) => authController.login(req, res));

export default authRoutes;
