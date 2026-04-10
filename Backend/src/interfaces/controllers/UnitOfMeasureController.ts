import { Request, Response } from "express";
import { UnitOfMeasureServiceImpl } from "../../infrastructure/services/UnitOfMeasureServiceImpl";

const service = new UnitOfMeasureServiceImpl();

export class UnitOfMeasureController {
    async getAll(req: Request, res: Response) {
        try {
            const data = await service.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener unidades de medida" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await service.getById(Number(req.params.id));
            if (!item) return res.status(404).json({ error: "Unidad de medida no encontrada" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener unidad de medida" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { nombre, abreviatura } = req.body;
            if (!nombre || !abreviatura) return res.status(400).json({ error: "Los campos 'nombre' y 'abreviatura' son requeridos" });
            const item = await service.create(nombre, abreviatura);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al crear unidad de medida" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { nombre, abreviatura } = req.body;
            const item = await service.update(Number(req.params.id), nombre, abreviatura);
            if (!item) return res.status(404).json({ error: "Unidad de medida no encontrada" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar unidad de medida" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const ok = await service.delete(Number(req.params.id));
            if (!ok) return res.status(404).json({ error: "Unidad de medida no encontrada" });
            res.json({ message: "Unidad de medida eliminada" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar unidad de medida" });
        }
    }
}
