export interface Login {
    username: string;
    password: string;
}

export interface Registro {
    nombre: string;
    apellido?: string;
    usuario: string;
    correo?: string;
    password: string;
    confirmarPassword?: string;
}

export interface RegistroResponse {
    id: number;
    nombre: string;
    usuario: string;
    password: string;
    updatedAt: string;
    createdAt: string;
}