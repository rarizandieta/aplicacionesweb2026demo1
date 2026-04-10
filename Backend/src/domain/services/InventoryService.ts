import { Inventory } from "../../infrastructure/models/InventoryModel";

export interface InventoryService {
    getAll(): Promise<any[]>;
    getByProductId(product_id: number): Promise<any | null>;
    getLowStock(): Promise<any[]>;
    upsert(product_id: number, data: {
        cantidad_disponible: number;
        stock_minimo?: number;
        stock_maximo?: number;
        unit_id: number;
        location_id?: number;
    }): Promise<Inventory>;
}
