"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFormatedDate = void 0;

var formatDate = function formatDate(currentDatetime) {
  var year = currentDatetime.getFullYear();
  var month = (currentDatetime.getMonth() + 1).toString().padStart(2, '0');
  var date = currentDatetime.getDate().toString().padStart(2, '0');
  var hour = currentDatetime.getHours().toString().padStart(2, '0');
  var min = currentDatetime.getMinutes().toString().padStart(2, '0');
  var sec = currentDatetime.getSeconds().toString().padStart(2, '0');
  return year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec;
};

var generateFormatedDate = function generateFormatedDate(currentDatetime) {
  return formatDate(currentDatetime);
};

exports.generateFormatedDate = generateFormatedDate;