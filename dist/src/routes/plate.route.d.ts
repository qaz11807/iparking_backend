import { AuthRoute, AdminRoute } from './route';
/** Class representing Plate Route. */
declare class PlateRoute extends AuthRoute {
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
/** Class representing Dashboard Plate Route. */
declare class PlatedminRoute extends AdminRoute {
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
export { PlateRoute, PlatedminRoute };
