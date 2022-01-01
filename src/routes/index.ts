import Route from './route';
import AuthRoute from './auth.route';
import OrderRoute from './order.route';
import PlateRoute from './plate.route';
import UserRoute from './user.route';
import PayRoute from './payment.route';
import MessageRoute from './cloud-message.route';

export const routers: Array<Route> = [
    new AuthRoute(),
    new OrderRoute(),
    new PlateRoute(),
    new UserRoute(),
    new PayRoute(),
    new MessageRoute(),
];
