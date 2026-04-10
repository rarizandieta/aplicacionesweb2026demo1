import { User } from "../../infrastructure/models/UserModel";

export interface UserService {
    createUser(nombre: string, usuario: string, password_hash: string): Promise<User>;
    getUserById(id: number): Promise<{ id: number; nombre: string; usuario: string } | null>;
    getUserByUsername(usuario: string): Promise<{ id: number; nombre: string; usuario: string; password_hash: string } | null>;
    updateUser(id: number, nombre: string, usuario: string, password_hash: string): Promise<{ id: number; nombre: string; usuario: string; password_hash: string } | null>;
    deleteUser(id: number): Promise<boolean>;
    assignRoleToUser(user_id: number, role_id: number): Promise<void>;
    removeRoleFromUser(user_id: number, role_id: number): Promise<void>;
    getUserWithRelations(id: number): Promise<any>;
}