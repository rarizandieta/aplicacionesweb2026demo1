import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { User } from "./UserModel";
import { RoleModel } from "./RoleModel";

export class UserRole extends Model {
    public id!: number;
    public user_id!: number;
    public role_id!: number;
}

UserRole.init(
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
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: RoleModel,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "user_roles",
        indexes: [
            {
                unique: true,
                fields: ["user_id", "role_id"],
            },
        ],
        timestamps: false,
    }
);

