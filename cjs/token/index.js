"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM = exports.ROUTER_CONFIG = exports.APP_INITIALIZER = exports.MICRO_OPTIONS = exports.HISTORY = void 0;
var di_1 = require("@fm/di");
exports.HISTORY = di_1.InjectorToken.get('HISTORY');
exports.MICRO_OPTIONS = di_1.InjectorToken.get('MICRO_MANAGER');
exports.APP_INITIALIZER = di_1.InjectorToken.get('APP_INITIALIZER');
exports.ROUTER_CONFIG = di_1.InjectorToken.get('ROUTER_CONFIG');
exports.PLATFORM = di_1.InjectorToken.get('PLATFORM');
