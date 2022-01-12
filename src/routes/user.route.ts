import {AdminRoute, AuthRoute} from './route';
import {schemaGetter} from '../middleware/validator-middleware';

/** middleware imported */
import * as UserApi from '../middleware/user-middleware';
import {registerUserWithRole} from '../middleware/register-middleware';

/** api request validator */
import ValidatorClient from '../valiadtors/client/user';
import ValidatorDashboard from '../valiadtors/dashboard/user';

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
        this.router.put('/token', schemaGetter(ValidatorClient.updateToken), UserApi.user.updateDeviceToken);
    }
}

/**
 *
 */
class UserAdminRoute extends AdminRoute {
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
        this.router.get('/count', UserApi.admin.getCount);
        this.router.get('/my', UserApi.admin.getSelf);
        this.router.get('/', schemaGetter(ValidatorDashboard.getAll), UserApi.admin.getAllUsers);
        this.router.post('/', schemaGetter(ValidatorDashboard.create), registerUserWithRole);
        this.router.put('/:id', schemaGetter(ValidatorDashboard.update), UserApi.admin.updateUser);
        this.router.get('/:id', schemaGetter(ValidatorDashboard.get), UserApi.admin.getUser);
        this.router.delete('/:id', schemaGetter(ValidatorDashboard.delete), UserApi.admin.deleteOrder);
    }
}

export {UserRoute, UserAdminRoute};
