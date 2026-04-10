import { Category } from "../models/CategoryModel";
import { CategoryService } from "../../domain/services/CategoryService";

export class CategoryServiceImpl implements CategoryService {
    async getAll(): Promise<Category[]> {
        return Category.findAll({ order: [["nombre", "ASC"]] });
    }

    async getById(id: number): Promise<Category | null> {
        return Category.findByPk(id);
    }

    async create(nombre: string, descripcion?: string): Promise<Category> {
        return Category.create({ nombre, descripcion });
    }

    async update(id: number, nombre: string, descripcion?: string): Promise<Category | null> {
        const category = await Category.findByPk(id);
        if (!category) return null;
        await category.update({ nombre, descripcion });
        return category;
    }

    async delete(id: number): Promise<boolean> {
        const category = await Category.findByPk(id);
        if (!category) return false;
        await category.destroy();
        return true;
    }
}
