import { User } from "../../infrastructure/models/UserModel";

export interface ProfileService {
    createUserProfile(userId: number, telefono: string | null, bio: string): Promise<void>;
    getUserProfile(userId: number): Promise<{ id: number; nombre: string; usuario: string; profile: { id: number; bio: string; telefono: string | null; } } | null>;
    updateUserProfile(userId: number, telefono: string | null, bio: string): Promise<void>;
}