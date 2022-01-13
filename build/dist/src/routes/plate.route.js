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
exports.PlatedminRoute = exports.PlateRoute = void 0;

var route_1 = require("./route");
/** middleware imported */


var PlateApi = __importStar(require("../middleware/plate-middleware"));

var validator_middleware_1 = require("../middleware/validator-middleware");
/** api request validator */


var plate_1 = __importDefault(require("../valiadtors/client/plate"));

var plate_2 = __importDefault(require("../valiadtors/dashboard/plate"));
/** Class representing Plate Route. */


var PlateRoute = /*#__PURE__*/function (_route_1$AuthRoute) {
  (0, _inherits2["default"])(PlateRoute, _route_1$AuthRoute);

  var _super = _createSuper(PlateRoute);

  /**
   * Create a routes.
   * @param {string} basePrefix
   */
  function PlateRoute(basePrefix) {
    var _this;

    (0, _classCallCheck2["default"])(this, PlateRoute);
    _this = _super.call(this, basePrefix);
    _this.prefix += '/plate';

    _this.setRoutes();

    return _this;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(PlateRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      /** User */
      this.router.get('/', (0, validator_middleware_1.schemaGetter)(plate_1["default"].getAll), PlateApi.user.getAllPlates);
      this.router.post('/', (0, validator_middleware_1.schemaGetter)(plate_1["default"].create), PlateApi.user.createPlate);
      this.router.put('/', (0, validator_middleware_1.schemaGetter)(plate_1["default"].update), PlateApi.user.updatePlate);
      this.router["delete"]('/', (0, validator_middleware_1.schemaGetter)(plate_1["default"]["delete"]), PlateApi.user.deletePlate);
    }
  }]);
  return PlateRoute;
}(route_1.AuthRoute);

exports.PlateRoute = PlateRoute;
/** Class representing Dashboard Plate Route. */

var PlatedminRoute = /*#__PURE__*/function (_route_1$AdminRoute) {
  (0, _inherits2["default"])(PlatedminRoute, _route_1$AdminRoute);

  var _super2 = _createSuper(PlatedminRoute);

  /**
   * Create a routes.
   * @param {string} basePrefix
   */
  function PlatedminRoute(basePrefix) {
    var _this2;

    (0, _classCallCheck2["default"])(this, PlatedminRoute);
    _this2 = _super2.call(this, basePrefix);
    _this2.prefix += '/plate';

    _this2.setRoutes();

    return _this2;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(PlatedminRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      this.router.get('/count', PlateApi.admin.getCount);
      this.router.get('/', (0, validator_middleware_1.schemaGetter)(plate_2["default"].getAll), PlateApi.admin.getAllPlates);
      this.router.get('/:id', (0, validator_middleware_1.schemaGetter)(plate_2["default"].get), PlateApi.admin.getPlate);
      this.router.post('/', (0, validator_middleware_1.schemaGetter)(plate_2["default"].create), PlateApi.admin.createPlate);
      this.router.put('/:id', (0, validator_middleware_1.schemaGetter)(plate_2["default"].update), PlateApi.admin.updatePlate);
      this.router["delete"]('/:id', (0, validator_middleware_1.schemaGetter)(plate_2["default"]["delete"]), PlateApi.admin.deletePlate);
    }
  }]);
  return PlatedminRoute;
}(route_1.AdminRoute);

exports.PlatedminRoute = PlatedminRoute;