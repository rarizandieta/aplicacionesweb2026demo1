import { Product } from "../models/ProductModel";
import { Category } from "../models/CategoryModel";
import { Brand } from "../models/BrandModel";
import { ProductService } from "../../domain/services/ProductService";

export class ProductServiceImpl implements ProductService {
    async getAll(): Promise<Product[]> {
        return Product.findAll({
            include: [
                { model: Category, as: "category" },
                { model: Brand, as: "brand" },
            ],
            order: [["nombre", "ASC"]],
        });
    }

    async getById(id: number): Promise<any | null> {
        return Product.findByPk(id, {
            include: [
                { model: Category, as: "category" },
                { model: Brand, as: "brand" },
            ],
        });
    }

    async create(data: {
        nombre: string;
        descripcion?: string;
        sku?: string;
        codigo_barras?: string;
        category_id: number;
        brand_id?: number;
    }): Promise<Product> {
        return Product.create(data as any);
    }

    async update(id: number, data: {
        nombre?: string;
        descripcion?: string;
        sku?: string;
        codigo_barras?: string;
        category_id?: number;
        brand_id?: number;
    }): Promise<Product | null> {
        const product = await Product.findByPk(id);
        if (!product) return null;
        await product.update(data);
        return product;
    }

    async delete(id: number): Promise<boolean> {
        const product = await Product.findByPk(id);
        if (!product) return false;
        await product.destroy();
        return true;
    }
}
