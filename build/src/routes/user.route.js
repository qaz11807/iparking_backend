"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserAdminRoute = exports.UserRoute = void 0;

var route_1 = require("./route");

var validator_middleware_1 = require("../middleware/validator-middleware");
/** middleware imported */


var UserApi = __importStar(require("../middleware/user-middleware"));

var register_middleware_1 = require("../middleware/register-middleware");
/** api request validator */


var user_1 = __importDefault(require("../valiadtors/client/user"));

var user_2 = __importDefault(require("../valiadtors/dashboard/user"));
/** Class representing Order Route. */


var UserRoute = /*#__PURE__*/function (_route_1$AuthRoute) {
  (0, _inherits2["default"])(UserRoute, _route_1$AuthRoute);

  var _super = _createSuper(UserRoute);

  /**
   * Create a routes.
   * @param {string} basePrefix
   */
  function UserRoute(basePrefix) {
    var _this;

    (0, _classCallCheck2["default"])(this, UserRoute);
    _this = _super.call(this, basePrefix);
    _this.prefix += '/user';

    _this.setRoutes();

    return _this;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(UserRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      this.router.put('/token', (0, validator_middleware_1.schemaGetter)(user_1["default"].updateToken), UserApi.user.updateDeviceToken);
    }
  }]);
  return UserRoute;
}(route_1.AuthRoute);

exports.UserRoute = UserRoute;
/**
 *
 */

var UserAdminRoute = /*#__PURE__*/function (_route_1$AdminRoute) {
  (0, _inherits2["default"])(UserAdminRoute, _route_1$AdminRoute);

  var _super2 = _createSuper(UserAdminRoute);

  /**
   * Create a routes.
   * @param {string} basePrefix
   */
  function UserAdminRoute(basePrefix) {
    var _this2;

    (0, _classCallCheck2["default"])(this, UserAdminRoute);
    _this2 = _super2.call(this, basePrefix);
    _this2.prefix += '/user';

    _this2.setRoutes();

    return _this2;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(UserAdminRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      this.router.get('/count', UserApi.admin.getCount);
      this.router.get('/my', UserApi.admin.getSelf);
      this.router.get('/', (0, validator_middleware_1.schemaGetter)(user_2["default"].getAll), UserApi.admin.getAllUsers);
      this.router.post('/', (0, validator_middleware_1.schemaGetter)(user_2["default"].create), register_middleware_1.registerUserWithRole);
      this.router.put('/:id', (0, validator_middleware_1.schemaGetter)(user_2["default"].update), UserApi.admin.updateUser);
      this.router.get('/:id', (0, validator_middleware_1.schemaGetter)(user_2["default"].get), UserApi.admin.getUser);
      this.router["delete"]('/:id', (0, validator_middleware_1.schemaGetter)(user_2["default"]["delete"]), UserApi.admin.deleteOrder);
    }
  }]);
  return UserAdminRoute;
}(route_1.AdminRoute);

exports.UserAdminRoute = UserAdminRoute;