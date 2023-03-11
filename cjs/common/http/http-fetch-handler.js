"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpFetchHandler = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var rxjs_1 = require("rxjs");
var app_context_1 = require("../../providers/app-context");
var HttpFetchHandler = /** @class */ (function () {
    function HttpFetchHandler(appContext) {
        this.fetch = appContext.fetch;
    }
    HttpFetchHandler.prototype.handle = function (req, params) {
        return (0, rxjs_1.from)((typeof fetch !== 'undefined' ? fetch : this.fetch)(req, params));
    };
    HttpFetchHandler = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [app_context_1.AppContextService])
    ], HttpFetchHandler);
    return HttpFetchHandler;
}());
exports.HttpFetchHandler = HttpFetchHandler;
