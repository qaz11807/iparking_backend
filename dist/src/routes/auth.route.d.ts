import { BaseRoute } from './route';
/** Class representing Auth Route. */
declare class AuthRouter extends BaseRoute {
    /**
     * Create a routes.
     */
    constructor();
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes(): void;
}
export default AuthRouter;
