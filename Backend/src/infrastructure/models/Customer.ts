import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Customer extends Model {
    public id!: number;
    public nombre!: string;
    public direccion!: string;
}

Customer.init(
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
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "customers",
        timestamps: false,
    }
);

