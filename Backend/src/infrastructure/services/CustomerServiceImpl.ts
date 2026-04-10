import { UserService } from "../../domain/services/UserService";
import { PasswordHistory } from "../models/PasswordHistoryModel";
import { RoleModel } from "../models/RoleModel";
import { User } from "../models/UserModel";
import { UserProfile } from "../models/UserProfileModel";
import { UserRole } from "../models/UserRole";
import { ProfileServiceImpl } from "./ProfileServiceImpl";
import { PasswordHistoryServiceImpl } from "./PasswordHistoryServiceImpl";
import { CustomerService } from "../../domain/services/CustomerService";
import { Customer } from "../models/Customer";

export class CustomerServiceImpl implements CustomerService {

    async createCustomer(nombre: string, direccion: string): Promise<Customer> {
        return await Customer.create({ nombre, direccion });   
        //insert into users values('Rigoberto', 'rgonzaleza', 'asdlkjasdljkhasdljkhdsahjklasdhjkdsa);
    }


}