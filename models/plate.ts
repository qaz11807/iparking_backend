import {Sequelize, DataTypes, ModelCtor, ModelStatic, Model} from 'sequelize';
import PlateInstance from './interfaces/plate-interface';

interface PlateStatic {
    associate?: (model: {[ key :string ]: ModelStatic<Model>}) => void;
}

export default (sequelize: Sequelize) => {
    const Plate : ModelCtor<PlateInstance> & PlateStatic = sequelize.define<PlateInstance>('Plate', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        license: {
            type: DataTypes.STRING,
        },
    });

    Plate.associate = function(models) {
        Plate.belongsTo(models['User']);
        Plate.hasMany(models['Order']);
    };

    return Plate;
};
