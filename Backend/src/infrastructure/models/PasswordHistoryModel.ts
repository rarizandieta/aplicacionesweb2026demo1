import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { User } from "./UserModel";

export class PasswordHistory extends Model {
    public id!: number;
    public user_id!: number;
    public password_hash!: string;
    public changed_at!: Date;
}

PasswordHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        changed_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "password_history",
        timestamps: false,
    }
);


