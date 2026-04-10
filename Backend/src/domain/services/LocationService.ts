import { Location } from "../../infrastructure/models/LocationModel";

export interface LocationService {
    getAll(): Promise<Location[]>;
    getById(id: number): Promise<Location | null>;
    create(nombre: string, descripcion?: string): Promise<Location>;
    update(id: number, nombre: string, descripcion?: string): Promise<Location | null>;
    delete(id: number): Promise<boolean>;
}
