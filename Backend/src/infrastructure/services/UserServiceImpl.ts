import { UserService } from "../../domain/services/UserService";
import { PasswordHistory } from "../models/PasswordHistoryModel";
import { RoleModel } from "../models/RoleModel";
import { User } from "../models/UserModel";
import { UserProfile } from "../models/UserProfileModel";
import { UserRole } from "../models/UserRole";
import { ProfileServiceImpl } from "./ProfileServiceImpl";
import { PasswordHistoryServiceImpl } from "./PasswordHistoryServiceImpl";

const passwordHistoryService = new PasswordHistoryServiceImpl();

export class UserServiceImpl implements UserService {
    async assignRoleToUser(user_id: number, role_id: number): Promise<void> {
        await UserRole.findOrCreate({
            where: { user_id, role_id },
            defaults: { user_id, role_id },
        });
    }

    async removeRoleFromUser(user_id: number, role_id: number): Promise<void> {
        await UserRole.destroy({ where: { user_id, role_id } });
    }

    async getUserWithRelations(id: number): Promise<any> {
        const user = await User.findByPk(id, {
            attributes: ["id", "nombre", "usuario"],
            include: [
                {
                    model: UserProfile,
                    as: "profile",
                    attributes: ["id", "telefono", "bio"],
                },
                {
                    model: PasswordHistory,
                    as: "passwordHistory",
                    attributes: ["id", "password_hash", "changed_at"],
                },
                {
                    model: RoleModel,
                    as: "roles",
                    attributes: ["id", "nombre"],
                    through: { attributes: [] },
                },
            ],
        });

        return user ? user.get() : null;
    }

    async createUser(nombre: string, usuario: string, password_hash: string) {
        const user: User = await User.create({ nombre, usuario, password_hash });
        //insert into users values('Rigoberto', 'rgonzaleza', 'asdlkjasdljkhasdljkhdsahjklasdhjkdsa);
        if (!user) {
            throw new Error("Error creating user");
        }

        await new ProfileServiceImpl().createUserProfile(user.id, null, "");
        await passwordHistoryService.addPasswordHistory(user.id, password_hash);

        return user;
    }

    async getUserById(id: number) {
        const user = await User.findByPk(id, {
            //select * from users where id = 2;
            attributes: ['id', 'nombre', 'usuario']
        });
        return user ? user.get() : null;
    }

    async getUserByUsername(usuario: string) {
        const user = await User.findOne({
            where: { usuario },
            attributes: ['id', 'nombre', 'usuario', 'password_hash']
        });
        return user ? user.get() : null;
    }

    async updateUser(id: number, nombre: string, usuario: string, password_hash: string) {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }

        const passwordChanged = user.password_hash !== password_hash;

        user.nombre = nombre;
        user.usuario = usuario;
        user.password_hash = password_hash;
        await user.save();

        if (passwordChanged) {
            await passwordHistoryService.addPasswordHistory(id, password_hash);
        }

        return user.get();
    }

    async deleteUser(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            return false;
        }
        await user.destroy();
        return true;
    }

}