import {BaseRoute} from './route';
import {signin} from '../middleware/auth-middleware';
import register from '../middleware/register-middleware';
import passport from 'passport';
import {loginRequest} from '../requests/auth-request';
import {registerRequest} from '../requests/register-request';
/** Class representing Auth Route. */
class AuthRouter extends BaseRoute {
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
        this.router.post('/signin', loginRequest, passport.authenticate('signin', {session: false}), signin);
        this.router.post('/register', registerRequest, register);
    }
}

export default AuthRouter;
