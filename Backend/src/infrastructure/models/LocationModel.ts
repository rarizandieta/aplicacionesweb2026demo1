import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Location extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion!: string | null;
}

Location.init(
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
        tableName: "locations",
        timestamps: false,
    }
);
