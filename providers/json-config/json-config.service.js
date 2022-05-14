import { __decorate, __metadata, __param } from "tslib";
import { Inject, LocatorStorage } from '@fm/di';
import { cloneDeep } from 'lodash';
import { map, shareReplay } from 'rxjs/operators';
import { AppContextService } from '../app-context';
let JsonConfigService = class JsonConfigService {
    ls;
    appContext;
    cacheConfig;
    constructor(ls) {
        this.ls = ls;
        this.appContext = this.ls.getProvider(AppContextService);
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
    __param(0, Inject(LocatorStorage)),
    __metadata("design:paramtypes", [LocatorStorage])
], JsonConfigService);
export { JsonConfigService };
