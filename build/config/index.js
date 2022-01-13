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

dotenv_1["default"].config();
var config = {
  url: process.env.HOST,
  port: process.env.PORT || 3000,
  defaultAdminPrefix: '/dashboard',
  jwtSecret: process.env.SECRET,
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