import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injector } from '@fm/di';
var JsonConfigService = /** @class */ (function () {
    function JsonConfigService(injector) {
        this.injector = injector;
    }
    JsonConfigService = __decorate([
        __param(0, Inject(Injector)),
        __metadata("design:paramtypes", [Injector])
    ], JsonConfigService);
    return JsonConfigService;
}());
export { JsonConfigService };
