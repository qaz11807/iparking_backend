import Route from './route';

/** middleware imported */
import {permissionAuth} from '../middleware/auth-middleware';
import * as PlateApi from '../middleware/plate-middleware';

/** api request validator */
import * as PlateRequest from '../requests/plate-request';

/** Class representing Order Route. */
class PlateRoute extends Route {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/plate';
        this.auth = true;
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

        /** Admin */
        this.router.get('/admin', permissionAuth, PlateRequest.admin.getAllPlates, PlateApi.admin.getAllPlates);
        this.router.post('/admin', permissionAuth, PlateRequest.admin.createPlate, PlateApi.admin.createPlate);
    }
}

export default PlateRoute;
