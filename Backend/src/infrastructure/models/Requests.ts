import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Requests extends Model {
    public pedidoId!: number;
    public clienteId!: number;
}

Requests.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pedidoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "requests",
        timestamps: false,
    }
);

