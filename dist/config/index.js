"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var config = {
    url: process.env.HOST,
    port: process.env.PORT || 3000,
    defaultAdminPrefix: '/dashboard',
    jwtSecret: process.env.SECRET,
    firebase: {
        databaseURL: 'https://ipark-dev-6eaf6.firebaseio.com',
        serviceAccountFilePath: path_1.default.join(__dirname, '/./ipark-dev-6eaf6-firebase-adminsdk-jlepc-21c05de00b.json'),
    },
    database: {
        username: process.env.DBUSER,
        host: process.env.DBHOST,
        database: process.env.DBNAME,
        password: process.env.DBPASS || null,
        dialect: 'postgres',
        ssl: process.env.SSLMODE,
    },
};
exports.default = config;
