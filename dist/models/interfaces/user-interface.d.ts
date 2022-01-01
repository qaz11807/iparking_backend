import {Model, Optional} from 'sequelize';
import {Role} from './role';
interface UserAttributes {
    id: number;
    username: string;
    password: string;
    role: Role;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}
export default interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
};;;;;;;;;;;;;;;;;;;;
export {};
