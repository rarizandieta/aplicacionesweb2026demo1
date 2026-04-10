import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Product extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion!: string | null;
    public sku!: string | null;
    public codigo_barras!: string | null;
    public category_id!: number;
    public brand_id!: number | null;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        codigo_barras: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "categories", key: "id" },
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "brands", key: "id" },
        },
    },
    {
        sequelize,
        tableName: "products",
        timestamps: false,
    }
);
