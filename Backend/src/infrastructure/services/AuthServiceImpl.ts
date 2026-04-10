import { AuthService } from "../../domain/services/AuthService";
import { UserServiceImpl } from "./UserServiceImpl";

const userService = new UserServiceImpl();

export class AuthServiceImpl implements AuthService {
    async login(usuario: string, password: string): Promise<{ id: number; nombre: string; usuario: string } | null> {
        const user = await userService.getUserByUsername(usuario);
        if (!user) return null;
        if (user.password_hash !== password) return null;
        return { id: user.id, nombre: user.nombre, usuario: user.usuario };
    }
}
