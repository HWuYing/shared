"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER_INTERCEPT = exports.ROUTER_CONFIG = exports.APP_INITIALIZER = exports.MICRO_OPTIONS = exports.HISTORY = exports.ENVIRONMENT = void 0;
const di_1 = require("@fm/di");
exports.ENVIRONMENT = di_1.InjectorToken.get('ENVIRONMENT');
exports.HISTORY = di_1.InjectorToken.get('HISTORY');
exports.MICRO_OPTIONS = di_1.InjectorToken.get('MICRO_MANAGER');
exports.APP_INITIALIZER = di_1.InjectorToken.get('APP_INITIALIZER');
exports.ROUTER_CONFIG = di_1.InjectorToken.get('ROUTER_CONFIG');
exports.ROUTER_INTERCEPT = di_1.InjectorToken.get('ROUTER_INTERCEPT');
