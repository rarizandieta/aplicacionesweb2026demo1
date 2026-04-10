import { Request, Response } from "express";
import { BrandServiceImpl } from "../../infrastructure/services/BrandServiceImpl";

const service = new BrandServiceImpl();

export class BrandController {
    async getAll(req: Request, res: Response) {
        try {
            const data = await service.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener marcas" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await service.getById(Number(req.params.id));
            if (!item) return res.status(404).json({ error: "Marca no encontrada" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener marca" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre) return res.status(400).json({ error: "El campo 'nombre' es requerido" });
            const item = await service.create(nombre, descripcion);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al crear marca" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { nombre, descripcion } = req.body;
            const item = await service.update(Number(req.params.id), nombre, descripcion);
            if (!item) return res.status(404).json({ error: "Marca no encontrada" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar marca" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const ok = await service.delete(Number(req.params.id));
            if (!ok) return res.status(404).json({ error: "Marca no encontrada" });
            res.json({ message: "Marca eliminada" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar marca" });
        }
    }
}
