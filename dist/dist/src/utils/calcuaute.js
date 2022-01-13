"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcauteParkingPrice = void 0;
const calcauteParkingPrice = (entranceTime, exitTime) => {
    const timestamp = exitTime.getTime() - entranceTime.getTime();
    const hours = Math.floor(timestamp / (1000 * 3600));
    return hours < 1 ? 30 : hours * 30;
};
exports.calcauteParkingPrice = calcauteParkingPrice;
