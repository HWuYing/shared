import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injector, InjectorToken } from '@fm/di';
import { cloneDeep } from 'lodash';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENVIRONMENT } from '../../token';
export const APP_CONTEXT = InjectorToken.get('APP_CONTEXT');
let AppContextService = class AppContextService {
    constructor(injector) {
        this.injector = injector;
        this.resourceCache = new Map();
    }
    getContext() {
        return this.injector.get(APP_CONTEXT) || {};
    }
    getEnvironment() {
        return this.injector.get(ENVIRONMENT);
    }
    getResourceCache(type) {
        if (!type || this.resourceCache.has(type)) {
            return type && this.resourceCache.get(type) || new Map();
        }
        const resource = this.getContext().resource;
        const cacheResource = new Map();
        Object.keys(resource).forEach((key) => {
            const { source, type: sourceType } = resource[key];
            if (sourceType === type) {
                cacheResource.set(key, of(source).pipe(map(cloneDeep)));
            }
        });
        this.resourceCache.set(type, cacheResource);
        return cacheResource;
    }
    get fetch() {
        return this.getContext().fetch;
    }
    get isMicro() {
        return this.getContext().isMicro;
    }
    get microManage() {
        return this.getContext().useMicroManage();
    }
};
AppContextService = __decorate([
    __param(0, Inject(Injector)),
    __metadata("design:paramtypes", [Injector])
], AppContextService);
export { AppContextService };
