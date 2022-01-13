"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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
exports.OrderAdminRoute = exports.OrderRoute = void 0;

var route_1 = require("./route");
/** middleware imported */


var validator_middleware_1 = require("../middleware/validator-middleware");

var OrderApi = __importStar(require("../middleware/order-middleware"));
/** api request validator */


var order_1 = __importDefault(require("../valiadtors/client/order"));

var order_2 = __importDefault(require("../valiadtors/dashboard/order"));
/** Class representing Order Route. */


var OrderRoute = /*#__PURE__*/function (_route_1$AuthRoute) {
  (0, _inherits2["default"])(OrderRoute, _route_1$AuthRoute);

  var _super = _createSuper(OrderRoute);

  /**
   * Create a routes.
   * @param {string} basePrefix
   */
  function OrderRoute(basePrefix) {
    var _this;

    (0, _classCallCheck2["default"])(this, OrderRoute);
    _this = _super.call(this, basePrefix);
    _this.prefix += '/order';
    _this.preHandlers = (0, _toConsumableArray2["default"])(_this.preHandlers);

    _this.setRoutes();

    return _this;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(OrderRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      this.router.get('/', (0, validator_middleware_1.schemaGetter)(order_1["default"].getAll), OrderApi.user.getAllOrders);
      this.router.get('/latest', OrderApi.user.getLatestOrder);
      this.router.put('/:id', (0, validator_middleware_1.schemaGetter)(order_1["default"].replyOrder), OrderApi.user.replyOrderChoice);
      this.router["delete"]('/:id', (0, validator_middleware_1.schemaGetter)(order_1["default"]["delete"]), OrderApi.user.deleteOrder);
    }
  }]);
  return OrderRoute;
}(route_1.AuthRoute);

exports.OrderRoute = OrderRoute;
/** */

var OrderAdminRoute = /*#__PURE__*/function (_route_1$AdminRoute) {
  (0, _inherits2["default"])(OrderAdminRoute, _route_1$AdminRoute);

  var _super2 = _createSuper(OrderAdminRoute);

  /**
   * Create a routes.
   * @param {string} basePrefix
   */
  function OrderAdminRoute(basePrefix) {
    var _this2;

    (0, _classCallCheck2["default"])(this, OrderAdminRoute);
    _this2 = _super2.call(this, basePrefix);
    _this2.prefix += '/order';
    _this2.preHandlers = (0, _toConsumableArray2["default"])(_this2.preHandlers);

    _this2.setRoutes();

    return _this2;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(OrderAdminRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      this.router.get('/count', OrderApi.admin.getCount);
      this.router.get('/', (0, validator_middleware_1.schemaGetter)(order_2["default"].getAll), OrderApi.admin.getAllOrders);
      this.router.get('/:id', (0, validator_middleware_1.schemaGetter)(order_2["default"].get), OrderApi.admin.getOrder);
      this.router.post('/', (0, validator_middleware_1.schemaGetter)(order_2["default"].create), OrderApi.admin.createOrder);
      this.router.put('/:id', (0, validator_middleware_1.schemaGetter)(order_2["default"].update), OrderApi.admin.updateOrder);
      this.router["delete"]('/:id', (0, validator_middleware_1.schemaGetter)(order_2["default"]["delete"]), OrderApi.admin.deleteOrder);
    }
  }]);
  return OrderAdminRoute;
}(route_1.AdminRoute);

exports.OrderAdminRoute = OrderAdminRoute;