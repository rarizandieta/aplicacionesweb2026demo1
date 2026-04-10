import { Request, Response } from "express";
import { AuthServiceImpl } from "../../infrastructure/services/AuthServiceImpl";

const authService = new AuthServiceImpl();

export class AuthController {
    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Los campos 'username' y 'password' son requeridos" });
        }
        try {
            const user = await authService.login(username, password);
            if (!user) {
                return res.status(401).json({ error: "Credenciales inválidas" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({ error: "Error al procesar el login" });
        }
    }
}
