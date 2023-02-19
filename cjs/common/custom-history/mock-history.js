"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockHistory = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var app_context_1 = require("../../providers/app-context");
var MockHistory = /** @class */ (function () {
    function MockHistory(injector) {
        this.injector = injector;
        this.appContext = this.injector.get(app_context_1.AppContextService);
    }
    MockHistory.prototype.push = function () {
        void (0);
    };
    MockHistory.prototype.replace = function (url) {
        this._redirect = { url: url };
    };
    MockHistory.prototype.listen = function () {
        return function () { void (0); };
    };
    Object.defineProperty(MockHistory.prototype, "location", {
        get: function () {
            return this.appContext.getContext().location;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MockHistory.prototype, "redirect", {
        get: function () {
            return this._redirect;
        },
        enumerable: false,
        configurable: true
    });
    MockHistory = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [di_1.Injector])
    ], MockHistory);
    return MockHistory;
}());
exports.MockHistory = MockHistory;
