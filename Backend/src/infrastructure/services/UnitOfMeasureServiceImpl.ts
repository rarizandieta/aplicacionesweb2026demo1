import { UnitOfMeasure } from "../models/UnitOfMeasureModel";
import { UnitOfMeasureService } from "../../domain/services/UnitOfMeasureService";

export class UnitOfMeasureServiceImpl implements UnitOfMeasureService {
    async getAll(): Promise<UnitOfMeasure[]> {
        return UnitOfMeasure.findAll({ order: [["nombre", "ASC"]] });
    }

    async getById(id: number): Promise<UnitOfMeasure | null> {
        return UnitOfMeasure.findByPk(id);
    }

    async create(nombre: string, abreviatura: string): Promise<UnitOfMeasure> {
        return UnitOfMeasure.create({ nombre, abreviatura });
    }

    async update(id: number, nombre: string, abreviatura: string): Promise<UnitOfMeasure | null> {
        const unit = await UnitOfMeasure.findByPk(id);
        if (!unit) return null;
        await unit.update({ nombre, abreviatura });
        return unit;
    }

    async delete(id: number): Promise<boolean> {
        const unit = await UnitOfMeasure.findByPk(id);
        if (!unit) return false;
        await unit.destroy();
        return true;
    }
}
