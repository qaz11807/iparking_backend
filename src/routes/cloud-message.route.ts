import {AdminRoute} from './route';

/** middleware imported */
import * as MessageApi from '../middleware/cloud-message-middleware';
import {schemaGetter} from '../middleware/validator-middleware';

/** api request validator */
import ValidtorDashboard from '../valiadtors/dashboard/cloud-message';

/** Class representing Dashboard Simulated Route. */
class MessageAdminRoute extends AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string) {
        super(basePrefix);
        this.prefix += '/simulate';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        /** Admin */
        this.router.post('/enter', schemaGetter(ValidtorDashboard.simulateEnter), MessageApi.admin.simulateEnter);
        this.router.post('/exit', schemaGetter(ValidtorDashboard.simulateExit), MessageApi.admin.simulateExit);
    }
}

export {MessageAdminRoute};
