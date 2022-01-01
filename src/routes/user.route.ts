import Route from './route';

/** middleware imported */
import * as UserApi from '../middleware/user-middleware';

/** api request validator */
import * as UserRequest from '../requests/user-request';

/** Class representing Order Route. */
class UserRoute extends Route {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/user';
        this.auth = true;
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        /** User */
        this.router.put('/token', UserRequest.user.updateDeviceToken, UserApi.user.updateDeviceToken);
    }
}

export default UserRoute;
