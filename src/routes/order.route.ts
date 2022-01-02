import {AuthRoute, AdminRoute} from './route';

/** middleware imported */
import * as OrderApi from '../middleware/order-middleware';

/** api request validator */
import * as OrderRequest from '../requests/order-request';

/** Class representing Order Route. */
class OrderRoute extends AuthRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string) {
        super(basePrefix);
        this.prefix += '/order';
        this.preHandlers = [...this.preHandlers];
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        this.router.get('/', OrderRequest.user.getAllOrders, OrderApi.user.getAllOrders);
        this.router.get('/latest', OrderApi.user.getLatestOrder);
        this.router.put('/:id', OrderRequest.user.replyOrderChoice, OrderApi.user.replyOrderChoice);
        this.router.delete('/:id', OrderRequest.user.deleteOrder, OrderApi.user.deleteOrder);
    }
}

/** */
class OrderAdminRoute extends AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string) {
        super(basePrefix);
        this.prefix += '/order';
        this.preHandlers = [...this.preHandlers];
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        this.router.get('/', OrderRequest.admin.getAllOrders, OrderApi.admin.getAllOrders);
        this.router.post('/', OrderRequest.admin.createOrder, OrderApi.admin.createOrder);
    }
}

export {OrderRoute, OrderAdminRoute};

