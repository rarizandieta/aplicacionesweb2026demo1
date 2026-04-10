import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class User extends Model {
    public id!: number;
    public nombre!: string;
    public usuario!: string;
    public password_hash!: string;
}

User.init(
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
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false,
    }
);

