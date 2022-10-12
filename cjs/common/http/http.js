"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var app_context_1 = require("../../providers/app-context");
var base_http_1 = require("./base-http");
var HttpClient = /** @class */ (function (_super) {
    tslib_1.__extends(HttpClient, _super);
    function HttpClient(appContext) {
        return _super.call(this, appContext.fetch) || this;
    }
    HttpClient = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [app_context_1.AppContextService])
    ], HttpClient);
    return HttpClient;
}(base_http_1.BaseHttp));
exports.HttpClient = HttpClient;
