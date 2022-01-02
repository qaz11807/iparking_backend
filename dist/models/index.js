"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
var sequelize_1 = require("sequelize");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var basename = path_1.default.basename(__filename);
var sequelize = new sequelize_1.Sequelize(config);
var db = {};
fs_1.default.readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
})
    .forEach(function (file) {
    var model = require(path_1.default.join(__dirname, file)).default(sequelize);
    db[model.name] = model;
});
Object.values(db).forEach(function (model) {
    if (model.associate) {
        model.associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
var paginate = function (_a, query) {
    var page = _a.page, pageSize = _a.pageSize;
    var limit = pageSize ? pageSize : 10;
    var offset = page ? page * pageSize : 0;
    return __assign(__assign({}, query), { offset: offset, limit: limit });
};
exports.paginate = paginate;
