"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatedminRoute = exports.PlateRoute = void 0;
const route_1 = require("./route");
/** middleware imported */
const PlateApi = __importStar(require("../middleware/plate-middleware"));
const validator_middleware_1 = require("../middleware/validator-middleware");
/** api request validator */
const plate_1 = __importDefault(require("../valiadtors/client/plate"));
const plate_2 = __importDefault(require("../valiadtors/dashboard/plate"));
/** Class representing Plate Route. */
class PlateRoute extends route_1.AuthRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix) {
        super(basePrefix);
        this.prefix += '/plate';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        /** User */
        this.router.get('/', (0, validator_middleware_1.schemaGetter)(plate_1.default.getAll), PlateApi.user.getAllPlates);
        this.router.post('/', (0, validator_middleware_1.schemaGetter)(plate_1.default.create), PlateApi.user.createPlate);
        this.router.put('/', (0, validator_middleware_1.schemaGetter)(plate_1.default.update), PlateApi.user.updatePlate);
        this.router.delete('/', (0, validator_middleware_1.schemaGetter)(plate_1.default.delete), PlateApi.user.deletePlate);
    }
}
exports.PlateRoute = PlateRoute;
/** Class representing Dashboard Plate Route. */
class PlatedminRoute extends route_1.AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix) {
        super(basePrefix);
        this.prefix += '/plate';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.get('/count', PlateApi.admin.getCount);
        this.router.get('/', (0, validator_middleware_1.schemaGetter)(plate_2.default.getAll), PlateApi.admin.getAllPlates);
        this.router.get('/:id', (0, validator_middleware_1.schemaGetter)(plate_2.default.get), PlateApi.admin.getPlate);
        this.router.post('/', (0, validator_middleware_1.schemaGetter)(plate_2.default.create), PlateApi.admin.createPlate);
        this.router.put('/:id', (0, validator_middleware_1.schemaGetter)(plate_2.default.update), PlateApi.admin.updatePlate);
        this.router.delete('/:id', (0, validator_middleware_1.schemaGetter)(plate_2.default.delete), PlateApi.admin.deletePlate);
    }
}
exports.PlatedminRoute = PlatedminRoute;
