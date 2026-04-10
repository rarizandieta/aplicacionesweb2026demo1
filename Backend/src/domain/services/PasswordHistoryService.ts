export interface PasswordHistoryService {
    addPasswordHistory(user_id: number, password_hash: string): Promise<any>;
    getPasswordHistories(user_id: number): Promise<any[]>;
}
