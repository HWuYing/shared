import { __decorate, __metadata, __param } from "tslib";
import { Inject, InjectorToken, LocatorStorage } from '@fm/di';
import { map, of } from '@fm/import-rxjs';
import { cloneDeep } from 'lodash';
import { ENVIRONMENT } from '../../token';
export const APP_CONTEXT = InjectorToken.get('APP_CONTEXT');
let AppContextService = class AppContextService {
    ls;
    resourceCache = new Map();
    constructor(ls) {
        this.ls = ls;
    }
    getContext() {
        return this.ls.getProvider(APP_CONTEXT) || {};
    }
    getEnvironment() {
        return this.ls.getProvider(ENVIRONMENT);
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
    get microManage() {
        return this.getContext().useMicroManage();
    }
    get fetch() {
        return this.getContext().fetch;
    }
    get isMicro() {
        return this.getContext().isMicro;
    }
};
AppContextService = __decorate([
    __param(0, Inject(LocatorStorage)),
    __metadata("design:paramtypes", [LocatorStorage])
], AppContextService);
export { AppContextService };
