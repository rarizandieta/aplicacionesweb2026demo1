import { Router } from "express"; 
import { ProfileController } from "../controllers/ProfileController";

const profileController = new ProfileController();

export const profileRoutes = Router();

profileRoutes.get("/profile/:id", (req, res) => profileController.getUserProfile(req, res));
profileRoutes.put("/profile/:id", (req, res) => profileController.updateUserProfile(req, res));

export default profileRoutes;