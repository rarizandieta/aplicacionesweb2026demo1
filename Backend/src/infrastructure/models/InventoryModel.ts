import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Inventory extends Model {
    public id!: number;
    public product_id!: number;
    public cantidad_disponible!: number;
    public stock_minimo!: number | null;
    public stock_maximo!: number | null;
    public unit_id!: number;
    public location_id!: number | null;
}

Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: { model: "products", key: "id" },
        },
        cantidad_disponible: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        stock_minimo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        stock_maximo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        unit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "units_of_measure", key: "id" },
        },
        location_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "locations", key: "id" },
        },
    },
    {
        sequelize,
        tableName: "inventory",
        timestamps: false,
    }
);
