"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRouterIntercept = exports.Router = exports.SharedHistory = void 0;
var custom_history_1 = require("./custom-history");
Object.defineProperty(exports, "SharedHistory", { enumerable: true, get: function () { return custom_history_1.SharedHistory; } });
var router_1 = require("./router");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return router_1.Router; } });
var router_intercept_abstract_1 = require("./router-intercept.abstract");
Object.defineProperty(exports, "AbstractRouterIntercept", { enumerable: true, get: function () { return router_intercept_abstract_1.AbstractRouterIntercept; } });
