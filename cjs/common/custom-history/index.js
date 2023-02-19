"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.MockHistory = exports.SharedHistory = void 0;
var custom_history_1 = require("./custom-history");
Object.defineProperty(exports, "SharedHistory", { enumerable: true, get: function () { return custom_history_1.SharedHistory; } });
var mock_history_1 = require("./mock-history");
Object.defineProperty(exports, "MockHistory", { enumerable: true, get: function () { return mock_history_1.MockHistory; } });
var router_1 = require("./router");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return router_1.Router; } });
