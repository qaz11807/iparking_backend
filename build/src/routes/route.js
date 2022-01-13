"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
exports.AdminRoute = exports.AuthRoute = exports.BaseRoute = void 0;

var express_1 = require("express");

var passport_1 = __importDefault(require("passport"));

var auth_middleware_1 = require("../middleware/auth-middleware");
/** Abstract Class representing Basic Route. */


var BaseRoute = /*#__PURE__*/function () {
  /**
   * Create a routes with basePrefix.
   * @param {string} basePrefix The basePrefix.
   */
  function BaseRoute(basePrefix) {
    (0, _classCallCheck2["default"])(this, BaseRoute);

    /* eslint-disable */
    this.router = (0, express_1.Router)();
    this.prefix = '/';
    this.preHandlers = [];

    if (basePrefix) {
      this.prefix = basePrefix;
    } else {
      this.prefix = '';
    }
  }
  /**
   * Get the router.
   * @return {Router} The router.
   */


  (0, _createClass2["default"])(BaseRoute, [{
    key: "getRouter",
    value: function getRouter() {
      return this.router;
    }
    /**
     * Get the route's prefix.
     * @return {string} The prefix.
     */

  }, {
    key: "getPrefix",
    value: function getPrefix() {
      return this.prefix;
    }
    /**
     * Get the pre handlers.
     * @return {Handler} The handler.
     */

  }, {
    key: "getPreHandlers",
    value: function getPreHandlers() {
      return this.preHandlers;
    }
  }]);
  return BaseRoute;
}();

exports.BaseRoute = BaseRoute;
/** Abstract Class representing Auth Route.*/

var AuthRoute = /*#__PURE__*/function (_BaseRoute) {
  (0, _inherits2["default"])(AuthRoute, _BaseRoute);

  var _super = _createSuper(AuthRoute);

  function AuthRoute() {
    var _this;

    (0, _classCallCheck2["default"])(this, AuthRoute);
    _this = _super.apply(this, arguments);
    _this.preHandlers = [passport_1["default"].authenticate('token', {
      session: false
    })];
    return _this;
  }

  return (0, _createClass2["default"])(AuthRoute);
}(BaseRoute);

exports.AuthRoute = AuthRoute;
/** Abstract Class representing Admin Route.*/

var AdminRoute = /*#__PURE__*/function (_AuthRoute) {
  (0, _inherits2["default"])(AdminRoute, _AuthRoute);

  var _super2 = _createSuper(AdminRoute);

  function AdminRoute() {
    var _this2;

    (0, _classCallCheck2["default"])(this, AdminRoute);
    _this2 = _super2.apply(this, arguments);
    _this2.preHandlers = [].concat((0, _toConsumableArray2["default"])(_this2.preHandlers), [auth_middleware_1.permissionAuth]);
    return _this2;
  }

  return (0, _createClass2["default"])(AdminRoute);
}(AuthRoute);

exports.AdminRoute = AdminRoute;