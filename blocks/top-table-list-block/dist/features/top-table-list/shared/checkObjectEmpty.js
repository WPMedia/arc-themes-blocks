"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// via https://stackoverflow.com/a/32108184
const checkObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

var _default = checkObjectEmpty;
exports.default = _default;