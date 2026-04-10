import { Request, Response } from "express";
import { InventoryServiceImpl } from "../../infrastructure/services/InventoryServiceImpl";

const service = new InventoryServiceImpl();

export class InventoryController {
    async getAll(req: Request, res: Response) {
        try {
            const data = await service.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener inventario" });
        }
    }

    async getByProductId(req: Request, res: Response) {
        try {
            const item = await service.getByProductId(Number(req.params.productId));
            if (!item) return res.status(404).json({ error: "Inventario no encontrado para este producto" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener inventario" });
        }
    }

    async getLowStock(req: Request, res: Response) {
        try {
            const data = await service.getLowStock();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener productos con bajo stock" });
        }
    }

    async upsert(req: Request, res: Response) {
        try {
            const product_id = Number(req.params.productId);
            const { cantidad_disponible, stock_minimo, stock_maximo, unit_id, location_id } = req.body;
            if (cantidad_disponible === undefined || !unit_id) {
                return res.status(400).json({ error: "Los campos 'cantidad_disponible' y 'unit_id' son requeridos" });
            }
            const item = await service.upsert(product_id, { cantidad_disponible, stock_minimo, stock_maximo, unit_id, location_id });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al guardar inventario" });
        }
    }
}
