import { BelongsToGetAssociationMixin, Model, Optional, HasManyGetAssociationsMixin } from 'sequelize';
import OrderInstance from './order-interface';
import UserInstance from './user-interface';
interface PlateAttributes {
    id: number;
    license: string;
}
interface PlateCreationAttributes extends Optional<PlateAttributes, 'id'> {
}
export default interface PlateInstance extends Model<PlateAttributes, PlateCreationAttributes>, PlateAttributes {
    getUser: BelongsToGetAssociationMixin<UserInstance>;
    getOrders: HasManyGetAssociationsMixin<OrderInstance>;
    user: UserInstance;
    orders: OrderInstance[];
}
export {};
