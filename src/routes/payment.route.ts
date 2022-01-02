import {BaseRoute} from './route';
import passport from 'passport';

/** middleware imported */
import * as PayApi from '../middleware/payment-middleware';

/** api request validator */
import * as PayRequest from '../requests/pay-request';

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
        /** User */
        this.router.post('/callback/:id', PayApi.user.paidResultCallback);
        this.router.post('/:id', passport.authenticate('token', {session: false}), PayRequest.user.getPayUrl, PayApi.user.getPayUrl);
    }
}

export {PayRoute};
