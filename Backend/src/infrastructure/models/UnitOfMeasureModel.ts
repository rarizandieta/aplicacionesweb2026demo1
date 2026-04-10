import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UnitOfMeasure extends Model {
    public id!: number;
    public nombre!: string;
    public abreviatura!: string;
}

UnitOfMeasure.init(
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
        abreviatura: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "units_of_measure",
        timestamps: false,
    }
);
