import { QueryTypes } from "sequelize";
import { connectDB, sequelize } from "./sequelize";
import { registerModels } from "../models";

const normalizeLegacyUsersPasswordColumn = async () => {
    const tableRows = await sequelize.query<{ exists: boolean }>(
        `SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'users'
        ) AS exists`,
        { type: QueryTypes.SELECT }
    );

    if (!tableRows[0]?.exists) {
        return;
    }

    const oldColumnRows = await sequelize.query<{ exists: boolean }>(
        `SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'password'
        ) AS exists`,
        { type: QueryTypes.SELECT }
    );

    const newColumnRows = await sequelize.query<{ exists: boolean }>(
        `SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'password_hash'
        ) AS exists`,
        { type: QueryTypes.SELECT }
    );

    if (oldColumnRows[0]?.exists && !newColumnRows[0]?.exists) {
        await sequelize.query(`ALTER TABLE users RENAME COLUMN password TO password_hash;`);
    }
};

export const initDatabase = async () => {
    await connectDB();
    const { RoleModel, Category, Brand, UnitOfMeasure, Location } = registerModels();

    await normalizeLegacyUsersPasswordColumn();
    await sequelize.sync();

    await RoleModel.findOrCreate({ where: { nombre: "admin" } });
    await RoleModel.findOrCreate({ where: { nombre: "estudiante" } });

    const categories = ["Lácteos", "Carnes", "Bebidas", "Granos", "Frutas y Verduras", "Otros"];
    for (const nombre of categories) {
        await Category.findOrCreate({ where: { nombre } });
    }

    const units = [
        { nombre: "Kilogramo", abreviatura: "kg" },
        { nombre: "Gramo", abreviatura: "g" },
        { nombre: "Litro", abreviatura: "L" },
        { nombre: "Mililitro", abreviatura: "ml" },
        { nombre: "Unidad", abreviatura: "uds" },
        { nombre: "Caja", abreviatura: "caja" },
    ];
    for (const unit of units) {
        await UnitOfMeasure.findOrCreate({ where: { abreviatura: unit.abreviatura }, defaults: unit });
    }

    const locations = ["Bodega", "Refrigerador", "Congelador", "Estante", "Vitrina"];
    for (const nombre of locations) {
        await Location.findOrCreate({ where: { nombre } });
    }
};
