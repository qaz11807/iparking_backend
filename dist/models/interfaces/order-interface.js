"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusNames = exports.Status = void 0;
var Status;
(function (Status) {
    Status["pending"] = "pending";
    Status["enter"] = "enter";
    Status["exit"] = "exit";
    Status["done"] = "done";
})(Status = exports.Status || (exports.Status = {}));
exports.StatusNames = Object.keys(Status);
