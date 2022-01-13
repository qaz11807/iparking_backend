import {Sequelize, FindOptions, Options} from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from '../config';

const basename = path.basename(__filename);
const dbConfig = config.database.ssl ? {...config.database, dialectOptions: {ssl: {require: true}}} : config.database;
const sequelize = new Sequelize(dbConfig as Options);

const db: any = {};

fs.readdirSync(__dirname)
    .filter((file)=> {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === ('.ts') || file.slice(-3) === ('.js'));
    })
    .forEach(async (file) => {
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
    const offset = page ? (page) * pageSize : 0;

    return {
        ...query,
        offset,
        limit,
    };
};
