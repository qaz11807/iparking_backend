/** Abstract Class representing Basic Route. */
declare abstract class Route {
    protected router: import('express-serve-static-core').Router;
    protected abstract setRoutes(): void;
    protected prefix: string;
    /**
     * Get the router.
     * @return {Router} The router.
     */
    getRouter(): import('express-serve-static-core').Router;
    /**
     * Get the route's prefix.
     * @return {string} The prefix.
     */
    getPrefix(): string;
}
export default Route;
