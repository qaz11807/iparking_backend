/** Abstract Class representing Basic Route. */
declare abstract class Route {
    protected router: import("express-serve-static-core").Router;
    protected abstract setRoutes(): void;
    protected prefix: string;
    protected auth: boolean;
    /**
     * Get the router.
     * @return {Router} The router.
     */
    getRouter(): import("express-serve-static-core").Router;
    /**
     * Get the route's prefix.
     * @return {string} The prefix.
     */
    getPrefix(): string;
    /**
     * Get if use auth stragety.
     * @return {boolean} use auth stragety or not.
     */
    isAuth(): boolean;
}
export default Route;
