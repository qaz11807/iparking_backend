import {BaseRoute} from './route';
import passport from 'passport';

/** middleware imported */
import {schemaGetter} from '../middleware/validator-middleware';
import {permissionAuth, signin} from '../middleware/auth-middleware';
import {registerUser} from '../middleware/register-middleware';

/** api request validator */
import ValidatorClient from '../valiadtors/client/auth';
/** Class representing Auth Route. */
class AuthRoute extends BaseRoute {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/auth';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        this.router.post('/signin', schemaGetter(ValidatorClient.login), passport.authenticate('signin', {session: false}), signin);
        this.router.post('/register', schemaGetter(ValidatorClient.register), registerUser);
    }
}

/** router for dashobard auth*/
class AuthDashBoardRoute extends BaseRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix?: string) {
        super(basePrefix);
        this.prefix += '/auth';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    protected setRoutes() {
        this.router.post('/signin', schemaGetter(ValidatorClient.login), passport.authenticate('signin', {session: false}), permissionAuth, signin);
    }
}

export {AuthRoute, AuthDashBoardRoute};
