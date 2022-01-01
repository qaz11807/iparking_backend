import Route from './route';

/** middleware imported */
import {permissionAuth} from '../middleware/auth-middleware';
import * as OrderApi from '../middleware/order-middleware';

/** api request validator */
import * as OrderRequest from '../requests/order-request';

/** Class representing Order Route. */
class OrderRoute extends Route {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/order';
        this.auth = true;
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        /** User */
        this.router.get('/', OrderRequest.user.getAllOrders, OrderApi.user.getAllOrders);
        this.router.get('/latest', OrderApi.user.getLatestOrder);
        this.router.put('/:id', OrderRequest.user.replyOrderChoice, OrderApi.user.replyOrderChoice);
        this.router.delete('/:id', OrderRequest.user.deleteOrder, OrderApi.user.deleteOrder);

        /** Admin */
        this.router.get('/admin', permissionAuth, OrderRequest.admin.getAllOrders, OrderApi.admin.getAllOrders);
        this.router.post('/admin', permissionAuth, OrderRequest.admin.createOrder, OrderApi.admin.createOrder);
    }
}

export default OrderRoute;
