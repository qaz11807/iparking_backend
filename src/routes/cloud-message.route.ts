import {AdminRoute} from './route';

/** middleware imported */
import {permissionAuth} from '../middleware/auth-middleware';
import * as MessageApi from '../middleware/cloud-message-middleware';

/** api request validator */
import * as MessageRequest from '../requests/cloud-message-request';
import passport from 'passport';

/** Class representing Dashboard Simulated Route. */
class MessageAdminRoute extends AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string) {
        super(basePrefix);
        this.prefix += '/simulate';
        this.preHandlers = [passport.authenticate('token', {session: false})];
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        /** Admin */
        this.router.post('/enter', permissionAuth, MessageRequest.admin.simulateEnter, MessageApi.admin.simulateEnter);
        this.router.post('/exit', permissionAuth, MessageRequest.admin.simulateExit, MessageApi.admin.simulateExit);
    }
}

export {MessageAdminRoute};
