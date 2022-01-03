import { AuthRoute, AdminRoute } from './route';
/** Class representing Order Route. */
declare class OrderRoute extends AuthRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string);
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes(): void;
}
/** */
declare class OrderAdminRoute extends AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string);
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes(): void;
}
export { OrderRoute, OrderAdminRoute };
