import {BaseRoute} from './route';
import {AuthRoute, AuthDashBoardRoute} from './auth.route';
import {OrderRoute, OrderAdminRoute} from './order.route';
import {PlateRoute, PlatedminRoute} from './plate.route';
import {UserRoute, UserAdminRoute} from './user.route';
import {PayRoute} from './payment.route';
import {MessageAdminRoute} from './cloud-message.route';
import config from '../../config';

const defaultAdminPrefix = config.defaultAdminPrefix;

export const routers: Array<BaseRoute> = [
    new AuthRoute(),
    new OrderRoute(),
    new PlateRoute(),
    new UserRoute(),
    new PayRoute(),
    new AuthDashBoardRoute(defaultAdminPrefix),
    new OrderAdminRoute(defaultAdminPrefix),
    new MessageAdminRoute(defaultAdminPrefix),
    new PlatedminRoute(defaultAdminPrefix),
    new UserAdminRoute(defaultAdminPrefix),
];
