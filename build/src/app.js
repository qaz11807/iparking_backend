"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var express_1 = __importDefault(require("express"));

var express_winston_1 = __importDefault(require("express-winston"));

var winston_1 = __importDefault(require("winston"));

var body_parser_1 = __importDefault(require("body-parser"));

var config_1 = __importDefault(require("../config"));

var models_1 = __importDefault(require("../models"));

var routes_1 = require("./routes");

var app_1 = require("firebase-admin/app");

var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));

var cors_1 = __importDefault(require("cors"));

var socket_io_1 = require("socket.io");

var http_1 = require("http");

var socket_middleware_1 = __importDefault(require("./middleware/socket-middleware"));

var path_1 = __importDefault(require("path"));

var openapi_json_1 = __importDefault(require("../openapi.json"));

var iparking_40634_firebase_adminsdk_rkufr_79d084e0fa_json_1 = __importDefault(require("../firebase/iparking-40634-firebase-adminsdk-rkufr-79d084e0fa.json"));

var startServer = function startServer() {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var app, port, _iterator, _step, router, server, io;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return models_1["default"].sequelize.sync();

          case 3:
            console.log("database success sync !!!");
            (0, app_1.initializeApp)({
              credential: (0, app_1.cert)(iparking_40634_firebase_adminsdk_rkufr_79d084e0fa_json_1["default"])
            });
            app = (0, express_1["default"])();
            port = config_1["default"].port;
            app.use(express_1["default"]["static"]('public'));
            app.use(body_parser_1["default"].urlencoded({
              extended: false
            }));
            app.use(body_parser_1["default"].json());
            app.use((0, cors_1["default"])());
            app.use(express_winston_1["default"].logger({
              transports: [new winston_1["default"].transports.Console(), new winston_1["default"].transports.File({
                filename: 'combined.log'
              })],
              format: winston_1["default"].format.combine(winston_1["default"].format.colorize(), winston_1["default"].format.json()),
              meta: true,
              msg: 'HTTP {{req.method}} {{req.url}}',
              expressFormat: true
            }));
            app.use('/api-docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(openapi_json_1["default"]));
            app.get('/', function (req, res) {
              res.sendFile(path_1["default"].join(__dirname, '/index.html'));
            });
            _iterator = _createForOfIteratorHelper(routes_1.routers);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                router = _step.value;
                app.use(router.getPrefix(), router.getPreHandlers(), router.getRouter());
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            app.use(express_winston_1["default"].errorLogger({
              transports: [new winston_1["default"].transports.Console(), new winston_1["default"].transports.File({
                filename: 'error.log',
                level: 'error'
              })],
              format: winston_1["default"].format.combine(winston_1["default"].format.colorize(), winston_1["default"].format.json())
            }));
            server = (0, http_1.createServer)(app);
            io = new socket_io_1.Server(server, {
              cors: {
                origin: 'http://localhost:3001',
                methods: ['GET', 'POST'],
                credentials: true
              }
            });
            server.listen(port, function () {
              console.log("server is listening on ".concat(port, " !!!"));
            });
            io.on('connection', function (socket) {
              console.log("".concat(socket.id, " is connected!"));
              socket.on('disconnect', function () {
                console.log("".concat(socket.id, " is disconnected!"));
              });
            });
            (0, socket_middleware_1["default"])(io);
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24]]);
  }));
};

exports["default"] = startServer;