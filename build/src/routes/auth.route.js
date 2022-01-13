"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthDashBoardRoute = exports.AuthRoute = void 0;

var route_1 = require("./route");

var passport_1 = __importDefault(require("passport"));
/** middleware imported */


var validator_middleware_1 = require("../middleware/validator-middleware");

var auth_middleware_1 = require("../middleware/auth-middleware");

var register_middleware_1 = require("../middleware/register-middleware");
/** api request validator */


var auth_1 = __importDefault(require("../valiadtors/client/auth"));
/** Class representing Auth Route. */


var AuthRoute = /*#__PURE__*/function (_route_1$BaseRoute) {
  (0, _inherits2["default"])(AuthRoute, _route_1$BaseRoute);

  var _super = _createSuper(AuthRoute);

  /**
   * Create a routes.
   */
  function AuthRoute() {
    var _this;

    (0, _classCallCheck2["default"])(this, AuthRoute);
    _this = _super.call(this);
    _this.prefix = '/auth';

    _this.setRoutes();

    return _this;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(AuthRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      this.router.post('/signin', (0, validator_middleware_1.schemaGetter)(auth_1["default"].login), passport_1["default"].authenticate('signin', {
        session: false
      }), auth_middleware_1.signin);
      this.router.post('/register', (0, validator_middleware_1.schemaGetter)(auth_1["default"].register), register_middleware_1.registerUser);
    }
  }]);
  return AuthRoute;
}(route_1.BaseRoute);

exports.AuthRoute = AuthRoute;
/** router for dashobard auth*/

var AuthDashBoardRoute = /*#__PURE__*/function (_route_1$BaseRoute2) {
  (0, _inherits2["default"])(AuthDashBoardRoute, _route_1$BaseRoute2);

  var _super2 = _createSuper(AuthDashBoardRoute);

  /**
   * Create a routes.
   * @param {string} basePrefix
   */
  function AuthDashBoardRoute(basePrefix) {
    var _this2;

    (0, _classCallCheck2["default"])(this, AuthDashBoardRoute);
    _this2 = _super2.call(this, basePrefix);
    _this2.prefix += '/auth';

    _this2.setRoutes();

    return _this2;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(AuthDashBoardRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      this.router.post('/signin', (0, validator_middleware_1.schemaGetter)(auth_1["default"].login), passport_1["default"].authenticate('signin', {
        session: false
      }), auth_middleware_1.permissionAuth, auth_middleware_1.signin);
    }
  }]);
  return AuthDashBoardRoute;
}(route_1.BaseRoute);

exports.AuthDashBoardRoute = AuthDashBoardRoute;