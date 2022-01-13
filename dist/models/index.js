"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const basename = path_1.default.basename(__filename);
const dbConfig = config_1.default.database.ssl ? Object.assign(Object.assign({}, config_1.default.database), { dialectOptions: { ssl: { require: true } } }) : config_1.default.database;
const sequelize = new sequelize_1.Sequelize(dbConfig);
const db = {};
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === ('.ts') || file.slice(-3) === ('.js'));
})
    .forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
    const model = require(path_1.default.join(__dirname, file)).default(sequelize);
    db[model.name] = model;
}));
Object.values(db).forEach((model) => {
    if (model.associate) {
        model.associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
const paginate = ({ page, pageSize }, query) => {
    const limit = pageSize ? pageSize : 10;
    const offset = page ? (page) * pageSize : 0;
    return Object.assign(Object.assign({}, query), { offset,
        limit });
};
exports.paginate = paginate;
