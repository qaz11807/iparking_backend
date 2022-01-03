import { Router, Handler } from 'express';
/** Abstract Class representing Basic Route. */
export declare abstract class BaseRoute {
    protected router: import("express-serve-static-core").Router;
    protected abstract setRoutes(): void;
    protected prefix: string;
    protected preHandlers: Handler[];
    /**
     * Create a routes with basePrefix.
     * @param {string} basePrefix The basePrefix.
     */
    constructor(basePrefix?: string);
    /**
     * Get the router.
     * @return {Router} The router.
     */
    getRouter(): Router;
    /**
     * Get the route's prefix.
     * @return {string} The prefix.
     */
    getPrefix(): string;
    /**
     * Get the pre handlers.
     * @return {Handler} The handler.
     */
    getPreHandlers(): Handler[];
}
/** Abstract Class representing Auth Route.*/
export declare abstract class AuthRoute extends BaseRoute {
    protected preHandlers: Handler[];
}
/** Abstract Class representing Admin Route.*/
export declare abstract class AdminRoute extends AuthRoute {
    protected preHandlers: Handler[];
}
