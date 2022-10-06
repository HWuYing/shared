import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injector } from '@fm/di';
import { cloneDeep } from 'lodash';
import { map, shareReplay } from 'rxjs/operators';
import { AppContextService } from '../app-context';
var JsonConfigService = /** @class */ (function () {
    function JsonConfigService(injector) {
        this.injector = injector;
        this.appContext = this.injector.get(AppContextService);
        this.cacheConfig = this.appContext.getResourceCache('file-static');
    }
    JsonConfigService.prototype.getJsonConfig = function (url) {
        var subject = this.cacheConfig.get(url);
        if (!subject) {
            subject = this.getServerFetchData(url).pipe(shareReplay(1), map(cloneDeep));
            this.cacheConfig.set(url, subject);
        }
        return subject;
    };
    JsonConfigService = __decorate([
        __param(0, Inject(Injector)),
        __metadata("design:paramtypes", [Injector])
    ], JsonConfigService);
    return JsonConfigService;
}());
export { JsonConfigService };
