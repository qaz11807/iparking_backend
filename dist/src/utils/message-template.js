"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doneMessage = exports.exitMessage = exports.enterMessage = void 0;
var enterMessage = function (deviceToken) {
    return {
        notification: {
            title: '確認入場',
            body: '請開啟應用程式並確認入場',
        },
        token: deviceToken,
    };
};
exports.enterMessage = enterMessage;
var exitMessage = function (deviceToken) {
    return {
        notification: {
            title: '付款成功',
            body: '請開啟應用程式並於10分鐘內出場',
        },
        token: deviceToken,
    };
};
exports.exitMessage = exitMessage;
var doneMessage = function (deviceToken) {
    return {
        notification: {
            title: '確認入場',
            body: '請開啟應用程式並確認入場',
        },
        token: deviceToken,
    };
};
exports.doneMessage = doneMessage;
