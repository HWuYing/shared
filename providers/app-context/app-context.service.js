"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContextService = exports.APP_CONTEXT = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@fm/di");
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const token_1 = require("../../token");
exports.APP_CONTEXT = di_1.InjectorToken.get('APP_CONTEXT');
let AppContextService = class AppContextService {
    injector;
    resourceCache = new Map();
    constructor(injector) {
        this.injector = injector;
    }
    getContext() {
        return this.injector.get(exports.APP_CONTEXT) || {};
    }
    getEnvironment() {
        return this.injector.get(token_1.ENVIRONMENT);
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
                cacheResource.set(key, (0, rxjs_1.of)(source).pipe((0, operators_1.map)(lodash_1.cloneDeep)));
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
AppContextService = tslib_1.__decorate([
    tslib_1.__param(0, (0, di_1.Inject)(di_1.Injector)),
    tslib_1.__metadata("design:paramtypes", [di_1.Injector])
], AppContextService);
exports.AppContextService = AppContextService;
