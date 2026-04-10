import { Request, Response } from "express";
import { LocationServiceImpl } from "../../infrastructure/services/LocationServiceImpl";

const service = new LocationServiceImpl();

export class LocationController {
    async getAll(req: Request, res: Response) {
        try {
            const data = await service.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener ubicaciones" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await service.getById(Number(req.params.id));
            if (!item) return res.status(404).json({ error: "Ubicación no encontrada" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener ubicación" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre) return res.status(400).json({ error: "El campo 'nombre' es requerido" });
            const item = await service.create(nombre, descripcion);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al crear ubicación" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { nombre, descripcion } = req.body;
            const item = await service.update(Number(req.params.id), nombre, descripcion);
            if (!item) return res.status(404).json({ error: "Ubicación no encontrada" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar ubicación" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const ok = await service.delete(Number(req.params.id));
            if (!ok) return res.status(404).json({ error: "Ubicación no encontrada" });
            res.json({ message: "Ubicación eliminada" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar ubicación" });
        }
    }
}
