"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dotenv_1 = __importDefault(require("dotenv"));

var path_1 = __importDefault(require("path"));

dotenv_1["default"].config();
var config = {
  url: process.env.HOST,
  port: process.env.PORT || 3000,
  defaultAdminPrefix: '/dashboard',
  jwtSecret: process.env.SECRET,
  firebase: {
    serviceAccountFilePath: path_1["default"].join(__dirname, '/../firebase/iparking-40634-firebase-adminsdk-rkufr-79d084e0fa.json')
  },
  database: {
    username: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASS || null,
    dialect: 'postgres',
    ssl: process.env.SSLMODE
  }
};
exports["default"] = config;