"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginate = void 0;

var sequelize_1 = require("sequelize");

var fs_1 = __importDefault(require("fs"));

var path_1 = __importDefault(require("path"));

var config_1 = __importDefault(require("../config"));

var basename = path_1["default"].basename(__filename);
var dbConfig = config_1["default"].database.ssl ? Object.assign(Object.assign({}, config_1["default"].database), {
  dialectOptions: {
    ssl: {
      require: true
    }
  }
}) : config_1["default"].database;
var sequelize = new sequelize_1.Sequelize(dbConfig);
var db = {};
fs_1["default"].readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.ts' || file.slice(-3) === '.js');
}).forEach(function (file) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var model;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            model = require(path_1["default"].join(__dirname, file))["default"](sequelize);
            db[model.name] = model;

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
});
Object.values(db).forEach(function (model) {
  if (model.associate) {
    model.associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports["default"] = db;

var paginate = function paginate(_ref, query) {
  var page = _ref.page,
      pageSize = _ref.pageSize;
  var limit = pageSize ? pageSize : 10;
  var offset = page ? page * pageSize : 0;
  return Object.assign(Object.assign({}, query), {
    offset: offset,
    limit: limit
  });
};

exports.paginate = paginate;