import { UnitOfMeasure } from "../../infrastructure/models/UnitOfMeasureModel";

export interface UnitOfMeasureService {
    getAll(): Promise<UnitOfMeasure[]>;
    getById(id: number): Promise<UnitOfMeasure | null>;
    create(nombre: string, abreviatura: string): Promise<UnitOfMeasure>;
    update(id: number, nombre: string, abreviatura: string): Promise<UnitOfMeasure | null>;
    delete(id: number): Promise<boolean>;
}
