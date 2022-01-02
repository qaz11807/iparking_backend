import {AuthRoute} from './route';

/** middleware imported */
import * as UserApi from '../middleware/user-middleware';

/** api request validator */
import * as UserRequest from '../requests/user-request';

/** Class representing Order Route. */
class UserRoute extends AuthRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string) {
        super(basePrefix);
        this.prefix += '/user';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        this.router.put('/token', UserRequest.user.updateDeviceToken, UserApi.user.updateDeviceToken);
    }
}

export {UserRoute};
