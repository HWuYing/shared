import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injector } from '@fm/di';
import { cloneDeep } from 'lodash';
import { map, shareReplay } from 'rxjs/operators';
import { AppContextService } from '../app-context';
let JsonConfigService = class JsonConfigService {
    constructor(injector) {
        this.injector = injector;
        this.appContext = this.injector.get(AppContextService);
        this.cacheConfig = this.appContext.getResourceCache('file-static');
    }
    getJsonConfig(url) {
        let subject = this.cacheConfig.get(url);
        if (!subject) {
            subject = this.getServerFetchData(url).pipe(shareReplay(1), map(cloneDeep));
            this.cacheConfig.set(url, subject);
        }
        return subject;
    }
};
JsonConfigService = __decorate([
    __param(0, Inject(Injector)),
    __metadata("design:paramtypes", [Injector])
], JsonConfigService);
export { JsonConfigService };
