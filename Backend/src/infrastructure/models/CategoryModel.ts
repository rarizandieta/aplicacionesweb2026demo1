import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Category extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion!: string | null;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "categories",
        timestamps: false,
    }
);
