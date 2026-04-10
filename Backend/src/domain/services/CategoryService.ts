import { Category } from "../../infrastructure/models/CategoryModel";

export interface CategoryService {
    getAll(): Promise<Category[]>;
    getById(id: number): Promise<Category | null>;
    create(nombre: string, descripcion?: string): Promise<Category>;
    update(id: number, nombre: string, descripcion?: string): Promise<Category | null>;
    delete(id: number): Promise<boolean>;
}
