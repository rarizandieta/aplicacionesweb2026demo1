import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class RequestDetails extends Model {
    public pedidoId!: number;
    public productoId!: number;
    public cantidad!: number;
}

RequestDetails.init(
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
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "request_details",
        timestamps: false,
    }
);

