import { BelongsToGetAssociationMixin, Model, Optional } from 'sequelize';
import UserInstance from './user-interface';
import PlateInstance from './plate-interface';
export declare enum Status {
    pending = "pending",
    enter = "enter",
    exit = "exit",
    done = "done"
}
export declare const StatusNames: string[];
interface OrderAttributes {
    id: number;
    enterTime: Date;
    exitTime?: Date;
    status: Status;
    tradeAmount?: number;
}
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {
}
export default interface OrderInstance extends Model<OrderAttributes, OrderCreationAttributes>, OrderAttributes {
    getUser: BelongsToGetAssociationMixin<UserInstance>;
    getPlate: BelongsToGetAssociationMixin<PlateInstance>;
    user: UserInstance;
    plate: PlateInstance;
}
export {};
