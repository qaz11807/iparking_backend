import {BaseRoute} from './route';
import AuthRouter from './auth.route';
import {OrderRoute, OrderAdminRoute} from './order.route';
import {PlateRoute, PlatedminRoute} from './plate.route';
import {UserRoute} from './user.route';
import {PayRoute} from './payment.route';
import {MessageAdminRoute} from './cloud-message.route';

const defaultAdminPrefix = '/dashboard';

export const routers: Array<BaseRoute> = [
    new AuthRouter(),
    new OrderRoute(),
    new PlateRoute(),
    new UserRoute(),
    new PayRoute(),
    new OrderAdminRoute(defaultAdminPrefix),
    new MessageAdminRoute(defaultAdminPrefix),
    new PlatedminRoute(defaultAdminPrefix),
];
