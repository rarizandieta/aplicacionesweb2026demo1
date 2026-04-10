import { Router } from "express"; 
import { UserController } from "../controllers/UserController";

const userController = new UserController();

export const userRoutes = Router();

userRoutes.post("/users", (req, res) => userController.createUser(req, res));
userRoutes.get("/users/:id", (req, res) => userController.getUserById(req, res));
userRoutes.get("/users/username/:usuario", (req, res) => userController.getUserByUsername(req, res));
userRoutes.put("/users/:id", (req, res) => userController.updateUser(req, res));
userRoutes.delete("/users/:id", (req, res) => userController.deleteUser(req, res));
userRoutes.get("/users/:id/full", (req, res) => userController.getUserWithRelations(req, res));
userRoutes.post("/users/:id/roles", (req, res) => userController.assignRoleToUser(req, res));
userRoutes.delete("/users/:id/roles/:roleId", (req, res) => userController.removeRoleFromUser(req, res));

export default userRoutes;