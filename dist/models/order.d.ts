import { Sequelize, ModelStatic, Model } from 'sequelize';
import OrderInstance from './interfaces/order-interface';
interface OrderStatic {
    associate?: (model: {
        [key: string]: ModelStatic<Model>;
    }) => void;
}
declare const _default: (sequelize: Sequelize) => typeof Model & (new () => OrderInstance) & OrderStatic;
export default _default;
