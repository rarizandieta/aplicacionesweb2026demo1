import { Request, Response } from "express";
import { CategoryServiceImpl } from "../../infrastructure/services/CategoryServiceImpl";

const service = new CategoryServiceImpl();

export class CategoryController {
    async getAll(req: Request, res: Response) {
        try {
            const data = await service.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener categorías" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await service.getById(Number(req.params.id));
            if (!item) return res.status(404).json({ error: "Categoría no encontrada" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener categoría" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre) return res.status(400).json({ error: "El campo 'nombre' es requerido" });
            const item = await service.create(nombre, descripcion);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al crear categoría" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { nombre, descripcion } = req.body;
            const item = await service.update(Number(req.params.id), nombre, descripcion);
            if (!item) return res.status(404).json({ error: "Categoría no encontrada" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar categoría" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const ok = await service.delete(Number(req.params.id));
            if (!ok) return res.status(404).json({ error: "Categoría no encontrada" });
            res.json({ message: "Categoría eliminada" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar categoría" });
        }
    }
}
