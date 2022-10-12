"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConfigService = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var JsonConfigService = /** @class */ (function () {
    function JsonConfigService(injector) {
        this.injector = injector;
    }
    JsonConfigService = tslib_1.__decorate([
        tslib_1.__param(0, (0, di_1.Inject)(di_1.Injector)),
        tslib_1.__metadata("design:paramtypes", [di_1.Injector])
    ], JsonConfigService);
    return JsonConfigService;
}());
exports.JsonConfigService = JsonConfigService;
