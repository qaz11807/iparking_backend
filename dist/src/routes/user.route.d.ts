import { AuthRoute } from './route';
/** Class representing Order Route. */
declare class UserRoute extends AuthRoute {
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
export { UserRoute };
