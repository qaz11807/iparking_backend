'use strict';
const __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : {'default': mod};
};
Object.defineProperty(exports, '__esModule', {value: true});
const sequelize_1 = require('sequelize');
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const basename = path_1.default.basename(__filename);
const sequelize = new sequelize_1.Sequelize(config);
const db = {};
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file) => {
        const model = require(path_1.default.join(__dirname, file)).default(sequelize);
        db[model.name] = model;
    });
Object.values(db).forEach((model) => {
    if (model.associate) {
        model.associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
