import {AuthRoute, AdminRoute} from './route';

/** middleware imported */
import * as PlateApi from '../middleware/plate-middleware';
import {schemaGetter} from '../middleware/validator-middleware';

/** api request validator */
import ValidatorClient from '../valiadtors/client/plate';
import ValidatorDashboard from '../valiadtors/dashboard/plate';

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
        this.router.get('/', schemaGetter(ValidatorClient.getAll), PlateApi.user.getAllPlates);
        this.router.post('/', schemaGetter(ValidatorClient.create), PlateApi.user.createPlate);
        this.router.put('/', schemaGetter(ValidatorClient.update), PlateApi.user.updatePlate);
        this.router.delete('/', schemaGetter(ValidatorClient.delete), PlateApi.user.deletePlate);
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
        this.router.get('/count', PlateApi.admin.getCount);
        this.router.get('/', schemaGetter(ValidatorDashboard.getAll), PlateApi.admin.getAllPlates);
        this.router.get('/:id', schemaGetter(ValidatorDashboard.get), PlateApi.admin.getPlate);
        this.router.post('/', schemaGetter(ValidatorDashboard.create), PlateApi.admin.createPlate);
        this.router.put('/:id', schemaGetter(ValidatorDashboard.update), PlateApi.admin.updatePlate);
        this.router.delete('/:id', schemaGetter(ValidatorDashboard.delete), PlateApi.admin.deletePlate);
    }
}

export {PlateRoute, PlatedminRoute};
