import { Request, Response } from "express";
import { ProfileServiceImpl } from "../../infrastructure/services/ProfileServiceImpl";

const profileService = new ProfileServiceImpl();

export class ProfileController {

    async getUserProfile(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await profileService.getUserProfile(Number(id));
            if (!user) {
                res.status(404).json({ error: "User profile not found" });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            res.status(500).json({ error: "Failed to fetch user profile" });
        }
    }

    async updateUserProfile(req: Request, res: Response) {
        const { id } = req.params;
        const { telefono, bio } = req.body;

        try {
            await profileService.updateUserProfile(Number(id), telefono ?? null, bio ?? "");
            const user = await profileService.getUserProfile(Number(id));
            res.status(200).json(user);
        } catch (error) {
            console.error("Error updating user profile:", error);
            res.status(500).json({ error: "Failed to update user profile" });
        }
    }

}