import { Sequelize, ModelStatic, Model } from 'sequelize';
import PlateInstance from './interfaces/plate-interface';
interface PlateStatic {
    associate?: (model: {
        [key: string]: ModelStatic<Model>;
    }) => void;
}
declare const _default: (sequelize: Sequelize) => typeof Model & (new () => PlateInstance) & PlateStatic;
export default _default;
