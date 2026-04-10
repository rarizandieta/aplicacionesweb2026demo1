import { Request, Response } from "express";
import { UserServiceImpl } from "../../infrastructure/services/UserServiceImpl";

const userService = new UserServiceImpl();

export class UserController {
    async createUser(req: Request, res: Response) {
        const { nombre, usuario, password_hash, password } = req.body;
        const effectivePasswordHash = password_hash ?? password;
        try {
            const user = await userService.createUser(nombre, usuario, effectivePasswordHash);
            res.status(201).json(user);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Failed to create user" });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(Number(id));
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Failed to fetch user" });
        }
    }

    async getUserByUsername(req: Request, res: Response) {
        const { usuario } = req.params;
        try {
            const user = await userService.getUserByUsername(String(usuario));
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Failed to fetch user" });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, usuario, password_hash, password } = req.body;
        const effectivePasswordHash = password_hash ?? password;
        try {
            const user = await userService.updateUser(Number(id), nombre, usuario, effectivePasswordHash);
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Failed to update user" });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const success = await userService.deleteUser(Number(id));
            if (success) {
                res.status(200).json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Failed to delete user" });
        }
    }

    async getUserWithRelations(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userService.getUserWithRelations(Number(id));
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error("Error fetching user with relations:", error);
            res.status(500).json({ error: "Failed to fetch user with relations" });
        }
    }

    async assignRoleToUser(req: Request, res: Response) {
        const { id } = req.params;
        const { role_id } = req.body;

        try {
            await userService.assignRoleToUser(Number(id), Number(role_id));
            const user = await userService.getUserWithRelations(Number(id));
            res.status(200).json(user);
        } catch (error) {
            console.error("Error assigning role to user:", error);
            res.status(500).json({ error: "Failed to assign role to user" });
        }
    }

    async removeRoleFromUser(req: Request, res: Response) {
        const { id, roleId } = req.params;
        try {
            await userService.removeRoleFromUser(Number(id), Number(roleId));
            const user = await userService.getUserWithRelations(Number(id));
            res.status(200).json(user);
        } catch (error) {
            console.error("Error removing role from user:", error);
            res.status(500).json({ error: "Failed to remove role from user" });
        }
    }

}