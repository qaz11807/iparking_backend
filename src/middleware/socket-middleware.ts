import {Server} from 'socket.io';
import db from '../../models';

export default (io: Server) => {
    db.Order.afterUpdate((order: any) => {
        // console.log('Order Updated', order);
        const id = order.id;
        io.sockets.emit(`order:${id}`, order);
    });

    db.Order.afterBulkUpdate((order: any) => {
        // console.log('Order Bulk Updated', order);
        const id = order.where.id;
        io.sockets.emit(`order:${id}`, {
            ...order.attributes,
            id: order.where.id,
        });
    });
};


