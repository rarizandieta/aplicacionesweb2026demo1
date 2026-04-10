import { Product } from "../../infrastructure/models/ProductModel";

export interface ProductService {
    getAll(): Promise<Product[]>;
    getById(id: number): Promise<any | null>;
    create(data: {
        nombre: string;
        descripcion?: string;
        sku?: string;
        codigo_barras?: string;
        category_id: number;
        brand_id?: number;
    }): Promise<Product>;
    update(id: number, data: {
        nombre?: string;
        descripcion?: string;
        sku?: string;
        codigo_barras?: string;
        category_id?: number;
        brand_id?: number;
    }): Promise<Product | null>;
    delete(id: number): Promise<boolean>;
}
