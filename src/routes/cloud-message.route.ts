import Route from './route';

/** middleware imported */
import {permissionAuth} from '../middleware/auth-middleware';
import * as MessageApi from '../middleware/cloud-message-middleware';

/** api request validator */
import * as MessageRequest from '../requests/cloud-message-request';

/** Class representing Order Route. */
class MessageRoute extends Route {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/simulate';
        this.auth = true;
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

export default MessageRoute;
