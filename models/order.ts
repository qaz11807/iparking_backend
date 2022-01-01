import {Sequelize, DataTypes, ModelCtor, ModelStatic, Model} from 'sequelize';
import OrderInstance, {Status, StatusNames} from './interfaces/order-interface';

interface OrderStatic {
    associate?: (model: {[ key :string ]: ModelStatic<Model>}) => void;
}

export default (sequelize: Sequelize) => {
    const Order : ModelCtor<OrderInstance> & OrderStatic = sequelize.define<OrderInstance>('Order', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        enterTime: {
            type: DataTypes.DATE,
        },
        exitTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        tradeAmount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: StatusNames,
            defaultValue: Status.pending,
        },
    });

    Order.associate = function(models) {
        Order.belongsTo(models['User']);
        Order.belongsTo(models['Plate']);
    };

    return Order;
};
