import { Request, Response } from "express";
import { PasswordHistoryServiceImpl } from "../../infrastructure/services/PasswordHistoryServiceImpl";

const passwordHistoryService = new PasswordHistoryServiceImpl();

export class PasswordHistoryController {
    async getPasswordHistories(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const histories = await passwordHistoryService.getPasswordHistories(Number(id));
            res.status(200).json(histories);
        } catch (error) {
            console.error("Error fetching password histories:", error);
            res.status(500).json({ error: "Failed to fetch password histories" });
        }
    }

    async addPasswordHistory(req: Request, res: Response) {
        const { id } = req.params;
        const { password_hash } = req.body;
        try {
            const history = await passwordHistoryService.addPasswordHistory(Number(id), password_hash);
            res.status(201).json(history);
        } catch (error) {
            console.error("Error adding password history:", error);
            res.status(500).json({ error: "Failed to add password history" });
        }
    }
}
