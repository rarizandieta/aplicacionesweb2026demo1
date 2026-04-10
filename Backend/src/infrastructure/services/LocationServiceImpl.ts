import { Location } from "../models/LocationModel";
import { LocationService } from "../../domain/services/LocationService";

export class LocationServiceImpl implements LocationService {
    async getAll(): Promise<Location[]> {
        return Location.findAll({ order: [["nombre", "ASC"]] });
    }

    async getById(id: number): Promise<Location | null> {
        return Location.findByPk(id);
    }

    async create(nombre: string, descripcion?: string): Promise<Location> {
        return Location.create({ nombre, descripcion });
    }

    async update(id: number, nombre: string, descripcion?: string): Promise<Location | null> {
        const location = await Location.findByPk(id);
        if (!location) return null;
        await location.update({ nombre, descripcion });
        return location;
    }

    async delete(id: number): Promise<boolean> {
        const location = await Location.findByPk(id);
        if (!location) return false;
        await location.destroy();
        return true;
    }
}
