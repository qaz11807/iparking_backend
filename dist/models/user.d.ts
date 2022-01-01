import {Sequelize, ModelStatic, Model} from 'sequelize';
import UserInstance from './interfaces/user-interface';
interface UserStatic {
    associate?: (model: {
        [key: string]: ModelStatic<Model>;
    }) => void;
}
declare const _default: (sequelize: Sequelize) => typeof Model & (new () => UserInstance) & UserStatic;
export default _default;
