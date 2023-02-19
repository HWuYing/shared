import { __decorate, __metadata } from "tslib";
import { Injectable, Injector } from '@fm/di';
import { AppContextService } from '../../providers/app-context';
var MockHistory = /** @class */ (function () {
    function MockHistory(injector) {
        this.injector = injector;
        this.appContext = this.injector.get(AppContextService);
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
    MockHistory = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Injector])
    ], MockHistory);
    return MockHistory;
}());
export { MockHistory };
