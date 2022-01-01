import {Model, Optional} from 'sequelize';
export declare enum Status {
    pending = 'pending',
    enter = 'entrance',
    exit = 'exit'
}
export declare const StatusNames: string[];
interface OrderAttributes {
    id: number;
    enterTime: Date;
    exitTime?: Date;
    status: Status;
    userId?: number;
    billId?: number;
    licenseId: number;
}
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {
}
/** as */
export default interface OrderInstance extends Model<OrderAttributes, OrderCreationAttributes>, OrderAttributes {
};;;;;;;;;;;;;;;;;;;;
export {};
