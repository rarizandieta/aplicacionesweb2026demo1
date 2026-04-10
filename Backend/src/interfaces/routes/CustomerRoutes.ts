import { Router } from "express"; 
import { CustomerController } from "../controllers/CustomerController";

const customerController = new CustomerController();

export const customerRoutes = Router();

customerRoutes.post("/customers", (req, res) => customerController.createCustomer(req, res));

export default customerRoutes;