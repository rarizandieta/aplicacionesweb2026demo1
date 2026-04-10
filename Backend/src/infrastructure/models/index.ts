import { User } from './UserModel';
import { RoleModel } from './RoleModel';
import { UserRole } from './UserRole';
import { PasswordHistory } from './PasswordHistoryModel';
import { UserProfile } from './UserProfileModel';
import { Category } from './CategoryModel';
import { Brand } from './BrandModel';
import { UnitOfMeasure } from './UnitOfMeasureModel';
import { Location } from './LocationModel';
import { Product } from './ProductModel';
import { Inventory } from './InventoryModel';
import { Customer } from './Customer';
import { Requests } from './Requests';

export const registerModels = () => {

    User.hasOne(UserProfile, { foreignKey: 'user_id', as: 'profile' });
    UserProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    User.hasMany(PasswordHistory, { foreignKey: 'user_id', as: 'passwordHistory' });
    PasswordHistory.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    User.belongsToMany(RoleModel, { through: UserRole, foreignKey: 'user_id', otherKey: 'role_id', as: 'roles' });
    RoleModel.belongsToMany(User, { through: UserRole, foreignKey: 'role_id', otherKey: 'user_id', as: 'users' });

    Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
    Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

    Brand.hasMany(Product, { foreignKey: 'brand_id', as: 'products' });
    Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });

    Product.hasOne(Inventory, { foreignKey: 'product_id', as: 'inventory' });
    Inventory.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

    UnitOfMeasure.hasMany(Inventory, { foreignKey: 'unit_id', as: 'inventories' });
    Inventory.belongsTo(UnitOfMeasure, { foreignKey: 'unit_id', as: 'unit' });

    Location.hasMany(Inventory, { foreignKey: 'location_id', as: 'inventories' });
    Inventory.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });

    Customer.hasMany(Requests, { foreignKey: 'customer_id', as: 'requests' });
    Requests.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

    return { User, RoleModel, UserRole, PasswordHistory, UserProfile, Category, Brand, UnitOfMeasure, Location, Product, Inventory };
}
