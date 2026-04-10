import { Brand } from "../../infrastructure/models/BrandModel";

export interface BrandService {
    getAll(): Promise<Brand[]>;
    getById(id: number): Promise<Brand | null>;
    create(nombre: string, descripcion?: string): Promise<Brand>;
    update(id: number, nombre: string, descripcion?: string): Promise<Brand | null>;
    delete(id: number): Promise<boolean>;
}
