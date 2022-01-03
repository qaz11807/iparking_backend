import {Router, Handler} from 'express';
import passport from 'passport';
import {permissionAuth} from '../middleware/auth-middleware';

/** Abstract Class representing Basic Route. */
export abstract class BaseRoute {
    /* eslint-disable */
    protected router = Router();
    /* eslint-enable */
    protected abstract setRoutes(): void;
    protected prefix: string = '/';
    protected preHandlers: Handler[] = [];

    /**
     * Create a routes with basePrefix.
     * @param {string} basePrefix The basePrefix.
     */
    constructor(basePrefix?: string) {
        if (basePrefix) {
            this.prefix = basePrefix;
        } else {
            this.prefix = '';
        }
    }
    /**
     * Get the router.
     * @return {Router} The router.
     */
    public getRouter(): Router {
        return this.router;
    }

    /**
     * Get the route's prefix.
     * @return {string} The prefix.
     */
    public getPrefix() {
        return this.prefix;
    }

    /**
     * Get the pre handlers.
     * @return {Handler} The handler.
     */
    public getPreHandlers() {
        return this.preHandlers;
    }
}

/** Abstract Class representing Auth Route.*/
export abstract class AuthRoute extends BaseRoute {
    protected preHandlers: Handler[] = [passport.authenticate('token', {session: false})];
}

/** Abstract Class representing Admin Route.*/
export abstract class AdminRoute extends AuthRoute {
    protected preHandlers: Handler[] = [...this.preHandlers, permissionAuth];
}
