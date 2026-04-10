import { PasswordHistoryService } from "../../domain/services/PasswordHistoryService";
import { PasswordHistory } from "../models/PasswordHistoryModel";

export class PasswordHistoryServiceImpl implements PasswordHistoryService {
    async addPasswordHistory(user_id: number, password_hash: string): Promise<any> {
        const history = await PasswordHistory.create({ user_id, password_hash });
        return history.get();
    }

    async getPasswordHistories(user_id: number): Promise<any[]> {
        const histories = await PasswordHistory.findAll({
            where: { user_id },
            order: [["changed_at", "DESC"]],
        });
        return histories.map((history) => history.get());
    }
}
