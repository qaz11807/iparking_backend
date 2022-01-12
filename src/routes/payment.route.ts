import {BaseRoute} from './route';
import passport from 'passport';

/** middleware imported */
import * as PayApi from '../middleware/payment-middleware';
import {schemaGetter} from '../middleware/validator-middleware';

/** api request validator */
import ValidatorClient from '../valiadtors/client/pay';

/** Class representing Order Route. */
class PayRoute extends BaseRoute {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/pay';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        this.router.post('/callback/:id', PayApi.user.paidResultCallback);
        this.router.get('/:id', passport.authenticate('token', {session: false}), schemaGetter(ValidatorClient.getPayUrl), PayApi.user.getPayUrl);
    }
}

export {PayRoute};
