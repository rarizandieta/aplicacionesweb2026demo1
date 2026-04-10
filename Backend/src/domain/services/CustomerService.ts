import { Customer } from "../../infrastructure/models/Customer";

export interface CustomerService {
    createCustomer(nombre: string, direccion: string): Promise<Customer>;
}