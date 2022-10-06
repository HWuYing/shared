"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConfigService = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var lodash_1 = require("lodash");
var operators_1 = require("rxjs/operators");
var app_context_1 = require("../app-context");
var JsonConfigService = /** @class */ (function () {
    function JsonConfigService(injector) {
        this.injector = injector;
        this.appContext = this.injector.get(app_context_1.AppContextService);
        this.cacheConfig = this.appContext.getResourceCache('file-static');
    }
    JsonConfigService.prototype.getJsonConfig = function (url) {
        var subject = this.cacheConfig.get(url);
        if (!subject) {
            subject = this.getServerFetchData(url).pipe((0, operators_1.shareReplay)(1), (0, operators_1.map)(lodash_1.cloneDeep));
            this.cacheConfig.set(url, subject);
        }
        return subject;
    };
    JsonConfigService = tslib_1.__decorate([
        tslib_1.__param(0, (0, di_1.Inject)(di_1.Injector)),
        tslib_1.__metadata("design:paramtypes", [di_1.Injector])
    ], JsonConfigService);
    return JsonConfigService;
}());
exports.JsonConfigService = JsonConfigService;
