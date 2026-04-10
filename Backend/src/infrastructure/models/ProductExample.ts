import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class ProductExample extends Model {
    public id!: number;
    public nombre!: string;
    public precio!: string;
}

ProductExample.init(
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
        precio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "product_examples",
        timestamps: false,
    }
);

