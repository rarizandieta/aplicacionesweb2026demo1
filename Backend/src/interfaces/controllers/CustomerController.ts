import { Request, Response } from "express";
import { UserServiceImpl } from "../../infrastructure/services/UserServiceImpl";
import { CustomerServiceImpl } from "../../infrastructure/services/CustomerServiceImpl";

const customerService = new CustomerServiceImpl();

export class CustomerController {
    async createCustomer(req: Request, res: Response) {
        const { nombre, direccion } = req.body;
        try {
            const customer = await customerService.createCustomer(nombre, direccion);
            res.status(201).json(customer);
        } catch (error) {
            console.error("Error creating customer:", error);
            res.status(500).json({ error: "Failed to create customer" });
        }
    }

}