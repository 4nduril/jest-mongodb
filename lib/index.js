"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _path = require("path");
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _default = exports.default = {
  globalSetup: (0, _path.resolve)(__dirname, './setup.js'),
  globalTeardown: (0, _path.resolve)(__dirname, './teardown.js'),
  testEnvironment: (0, _path.resolve)(__dirname, './environment.js')
};