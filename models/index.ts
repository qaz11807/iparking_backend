import {Sequelize, FindOptions} from 'sequelize';
import fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const basename = path.basename(__filename);
const sequelize = new Sequelize(config);

const db: any = {};

fs.readdirSync(__dirname)
    .filter((file)=> {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file)).default(sequelize);
        db[model.name] = model;
    });

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

db.sequelize=sequelize;
db.Sequelize=Sequelize;

export default db;

interface Pagenation{
    page: number;
    pageSize: number;
}
export const paginate = ({page, pageSize} : Pagenation, query?: FindOptions ) => {
    const limit = pageSize ? pageSize : 10;
    const offset = page ? page * pageSize : 0;

    return {
        ...query,
        offset,
        limit,
    };
};
