import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { User } from "./UserModel";

export class UserProfile extends Model {
    public id!: number;
    public user_id!: number;
    public telefono!: string | null;
    public bio!: string;
    public photo_profile!: string;
}

UserProfile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: User,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "user_profiles",
        timestamps: false,
    }

);

