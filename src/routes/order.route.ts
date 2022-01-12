import {AuthRoute, AdminRoute} from './route';

/** middleware imported */
import {schemaGetter} from '../middleware/validator-middleware';
import * as OrderApi from '../middleware/order-middleware';

/** api request validator */
import ValidatorClient from '../valiadtors/client/order';
import ValidatorDashboard from '../valiadtors/dashboard/order';
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
        this.router.get('/', schemaGetter(ValidatorClient.getAll), OrderApi.user.getAllOrders);
        this.router.get('/latest', OrderApi.user.getLatestOrder);
        this.router.put('/:id', schemaGetter(ValidatorClient.replyOrder), OrderApi.user.replyOrderChoice);
        this.router.delete('/:id', schemaGetter(ValidatorClient.delete), OrderApi.user.deleteOrder);
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
        this.router.get('/count', OrderApi.admin.getCount);
        this.router.get('/', schemaGetter(ValidatorDashboard.getAll), OrderApi.admin.getAllOrders);
        this.router.get('/:id', schemaGetter(ValidatorDashboard.get), OrderApi.admin.getOrder);
        this.router.post('/', schemaGetter(ValidatorDashboard.create), OrderApi.admin.createOrder);
        this.router.put('/:id', schemaGetter(ValidatorDashboard.update), OrderApi.admin.updateOrder);
        this.router.delete('/:id', schemaGetter(ValidatorDashboard.delete), OrderApi.admin.deleteOrder);
    }
}

export {OrderRoute, OrderAdminRoute};

