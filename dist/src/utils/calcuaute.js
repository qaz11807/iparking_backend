"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcauteParkingPrice = void 0;
var calcauteParkingPrice = function (entranceTime, exitTime) {
    var timestamp = exitTime.getTime() - entranceTime.getTime();
    var hours = Math.floor(timestamp / (1000 * 3600));
    return hours < 1 ? 30 : hours * 30;
};
exports.calcauteParkingPrice = calcauteParkingPrice;
