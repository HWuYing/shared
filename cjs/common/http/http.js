"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var rxjs_1 = require("rxjs");
var app_context_1 = require("../../providers/app-context");
function factoryRequest(fetch, method, parseData) {
    return function (url, params) { return (0, rxjs_1.from)(fetch(url, tslib_1.__assign({ method: method }, params)).then(parseData)); };
}
var HttpClient = /** @class */ (function () {
    function HttpClient(appContext) {
        this.appContext = appContext;
        this.fetch = this.appContext.fetch;
    }
    HttpClient.prototype.get = function (req, params) {
        return factoryRequest(this.fetch, 'get', function (res) { return res.json(); })(req, params);
    };
    HttpClient.prototype.getText = function (req, params) {
        return factoryRequest(this.fetch, 'get', function (res) { return res.text(); })(req, params);
    };
    HttpClient = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [app_context_1.AppContextService])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
