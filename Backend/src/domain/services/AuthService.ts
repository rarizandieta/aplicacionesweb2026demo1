export interface AuthService {
    login(usuario: string, password: string): Promise<{ id: number; nombre: string; usuario: string } | null>;
}
