import { ProfileService } from "../../domain/services/ProfileService";
import { User } from "../models/UserModel";
import { UserProfile } from "../models/UserProfileModel";

export class ProfileServiceImpl implements ProfileService {

    async createUserProfile(userId: number, telefono: string | null, bio: string): Promise<void> {
        const [profile] = await UserProfile.findOrCreate({
            where: { user_id: userId },
            defaults: { user_id: userId, telefono, bio },
        });

        if (profile && profile.user_id === userId) {
            profile.telefono = telefono;
            profile.bio = bio;
            await profile.save();
        }
    }

    async getUserProfile(userId: number): Promise<{ id: number; nombre: string; usuario: string; profile: { id: number; bio: string; telefono: string | null; }; } | null> {
        const user = await User.findByPk(userId, {
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['id', 'bio', 'telefono']
            }]
        });
        return user ? user.get() : null;
    }

    async updateUserProfile(userId: number, telefono: string | null, bio: string): Promise<void> {
        const [profile] = await UserProfile.findOrCreate({
            where: { user_id: userId },
            defaults: { user_id: userId, telefono, bio },
        });

        profile.telefono = telefono;
        profile.bio = bio;
        await profile.save();
    }
}