import { Brand } from "../models/BrandModel";
import { BrandService } from "../../domain/services/BrandService";

export class BrandServiceImpl implements BrandService {
    async getAll(): Promise<Brand[]> {
        return Brand.findAll({ order: [["nombre", "ASC"]] });
    }

    async getById(id: number): Promise<Brand | null> {
        return Brand.findByPk(id);
    }

    async create(nombre: string, descripcion?: string): Promise<Brand> {
        return Brand.create({ nombre, descripcion });
    }

    async update(id: number, nombre: string, descripcion?: string): Promise<Brand | null> {
        const brand = await Brand.findByPk(id);
        if (!brand) return null;
        await brand.update({ nombre, descripcion });
        return brand;
    }

    async delete(id: number): Promise<boolean> {
        const brand = await Brand.findByPk(id);
        if (!brand) return false;
        await brand.destroy();
        return true;
    }
}
