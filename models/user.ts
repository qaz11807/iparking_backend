import {Sequelize, DataTypes, ModelCtor, ModelStatic, Model} from 'sequelize';
import UserInstance from './interfaces/user-interface';
import {Role, RoleNames} from './interfaces/role';

interface UserStatic {
    associate?: (model: {[ key :string ]: ModelStatic<Model>}) => void;
}

export default (sequelize: Sequelize) => {
    const User : ModelCtor<UserInstance> & UserStatic= sequelize.define<UserInstance>('User', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        deviceToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM,
            values: RoleNames,
            defaultValue: Role.user,
        },
    });
    User.associate = function(models) {
        User.hasMany(models['Order']);
        User.hasMany(models['Plate']);
    };

    return User;
};
