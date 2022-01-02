import {AuthRoute, AdminRoute} from './route';

/** middleware imported */
import {permissionAuth} from '../middleware/auth-middleware';
import * as PlateApi from '../middleware/plate-middleware';

/** api request validator */
import * as PlateRequest from '../requests/plate-request';

/** Class representing Plate Route. */
class PlateRoute extends AuthRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string) {
        super(basePrefix);
        this.prefix += '/plate';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        /** User */
        this.router.get('/', PlateRequest.user.getAllPlates, PlateApi.user.getAllPlates);
        this.router.post('/', PlateRequest.user.createPlate, PlateApi.user.createPlate);
        this.router.put('/', PlateRequest.user.updatePlate, PlateApi.user.updatePlate);
        this.router.delete('/', PlateRequest.user.deletePlate, PlateApi.user.deletePlate);
    }
}

/** Class representing Dashboard Plate Route. */
class PlatedminRoute extends AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string) {
        super(basePrefix);
        this.prefix += '/plate';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        this.router.get('/', permissionAuth, PlateRequest.admin.getAllPlates, PlateApi.admin.getAllPlates);
        this.router.post('/', permissionAuth, PlateRequest.admin.createPlate, PlateApi.admin.createPlate);
    }
}

export {PlateRoute, PlatedminRoute};
