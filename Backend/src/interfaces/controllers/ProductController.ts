import { Request, Response } from "express";
import { ProductServiceImpl } from "../../infrastructure/services/ProductServiceImpl";

const service = new ProductServiceImpl();

export class ProductController {
    async getAll(req: Request, res: Response) {
        try {
            const data = await service.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener productos" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await service.getById(Number(req.params.id));
            if (!item) return res.status(404).json({ error: "Producto no encontrado" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener producto" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { nombre, descripcion, sku, codigo_barras, category_id, brand_id } = req.body;
            if (!nombre || !category_id) {
                return res.status(400).json({ error: "Los campos 'nombre' y 'category_id' son requeridos" });
            }
            const item = await service.create({ nombre, descripcion, sku, codigo_barras, category_id, brand_id });
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al crear producto" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { nombre, descripcion, sku, codigo_barras, category_id, brand_id } = req.body;
            const item = await service.update(Number(req.params.id), { nombre, descripcion, sku, codigo_barras, category_id, brand_id });
            if (!item) return res.status(404).json({ error: "Producto no encontrado" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar producto" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const ok = await service.delete(Number(req.params.id));
            if (!ok) return res.status(404).json({ error: "Producto no encontrado" });
            res.json({ message: "Producto eliminado" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar producto" });
        }
    }
}
