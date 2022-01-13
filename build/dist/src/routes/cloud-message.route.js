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
exports.MessageAdminRoute = void 0;

var route_1 = require("./route");
/** middleware imported */


var MessageApi = __importStar(require("../middleware/cloud-message-middleware"));

var validator_middleware_1 = require("../middleware/validator-middleware");
/** api request validator */


var cloud_message_1 = __importDefault(require("../valiadtors/dashboard/cloud-message"));
/** Class representing Dashboard Simulated Route. */


var MessageAdminRoute = /*#__PURE__*/function (_route_1$AdminRoute) {
  (0, _inherits2["default"])(MessageAdminRoute, _route_1$AdminRoute);

  var _super = _createSuper(MessageAdminRoute);

  /**
   * Create a routes.
   * @param {string} basePrefix
   */
  function MessageAdminRoute(basePrefix) {
    var _this;

    (0, _classCallCheck2["default"])(this, MessageAdminRoute);
    _this = _super.call(this, basePrefix);
    _this.prefix += '/simulate';

    _this.setRoutes();

    return _this;
  }
  /**
   * Set the router's routes and middleware.
   */


  (0, _createClass2["default"])(MessageAdminRoute, [{
    key: "setRoutes",
    value: function setRoutes() {
      /** Admin */
      this.router.post('/enter', (0, validator_middleware_1.schemaGetter)(cloud_message_1["default"].simulateEnter), MessageApi.admin.simulateEnter);
      this.router.post('/exit', (0, validator_middleware_1.schemaGetter)(cloud_message_1["default"].simulateExit), MessageApi.admin.simulateExit);
    }
  }]);
  return MessageAdminRoute;
}(route_1.AdminRoute);

exports.MessageAdminRoute = MessageAdminRoute;