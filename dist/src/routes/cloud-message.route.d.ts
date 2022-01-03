import { AdminRoute } from './route';
/** Class representing Dashboard Simulated Route. */
declare class MessageAdminRoute extends AdminRoute {
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
export { MessageAdminRoute };
