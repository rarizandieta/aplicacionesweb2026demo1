import { sequelize } from "../database/sequelize";
import { Inventory } from "../models/InventoryModel";
import { Product } from "../models/ProductModel";
import { Category } from "../models/CategoryModel";
import { Brand } from "../models/BrandModel";
import { UnitOfMeasure } from "../models/UnitOfMeasureModel";
import { Location } from "../models/LocationModel";
import { InventoryService } from "../../domain/services/InventoryService";

const fullInclude = [
    {
        model: Product,
        as: "product",
        include: [
            { model: Category, as: "category" },
            { model: Brand, as: "brand" },
        ],
    },
    { model: UnitOfMeasure, as: "unit" },
    { model: Location, as: "location" },
];

export class InventoryServiceImpl implements InventoryService {
    async getAll(): Promise<any[]> {
        return Inventory.findAll({ include: fullInclude });
    }

    async getByProductId(product_id: number): Promise<any | null> {
        return Inventory.findOne({ where: { product_id }, include: fullInclude });
    }

    async getLowStock(): Promise<any[]> {
        return Inventory.findAll({
            where: sequelize.literal(
                '"inventory"."stock_minimo" IS NOT NULL AND "inventory"."cantidad_disponible" < "inventory"."stock_minimo"'
            ),
            include: fullInclude,
        });
    }

    async upsert(product_id: number, data: {
        cantidad_disponible: number;
        stock_minimo?: number;
        stock_maximo?: number;
        unit_id: number;
        location_id?: number;
    }): Promise<Inventory> {
        const [inventory] = await Inventory.findOrCreate({
            where: { product_id },
            defaults: { product_id, ...data } as any,
        });
        await inventory.update(data);
        return inventory;
    }
}
