import {Router} from 'express';

/** Abstract Class representing Basic Route. */
abstract class Route {
    /* eslint-disable */
    protected router = Router();
    /* eslint-enable */
    protected abstract setRoutes(): void;
    protected prefix: string = '/';
    protected auth: boolean = false;
    /**
     * Get the router.
     * @return {Router} The router.
     */
    public getRouter() {
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
     * Get if use auth stragety.
     * @return {boolean} use auth stragety or not.
     */
    public isAuth() {
        return this.auth;
    }
}

export default Route;
