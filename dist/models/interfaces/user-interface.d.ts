import { HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, Model, Optional } from 'sequelize';
import { Role } from './role';
import OrderInstance from './order-interface';
import PlateInstance from './plate-interface';
interface UserAttributes {
    id: number;
    username: string;
    password: string;
    deviceToken?: string;
    role: Role;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}
export default interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    getOrders: HasManyGetAssociationsMixin<OrderInstance>;
    createOrder: HasManyCreateAssociationMixin<OrderInstance>;
    orders: OrderInstance[];
    getPlates: HasManyGetAssociationsMixin<PlateInstance>;
    createPlate: HasManyCreateAssociationMixin<PlateInstance>;
    plates: OrderInstance[];
}
export {};
