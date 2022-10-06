import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injector, InjectorToken } from '@fm/di';
import { cloneDeep } from 'lodash';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENVIRONMENT } from '../../token';
export var APP_CONTEXT = InjectorToken.get('APP_CONTEXT');
var AppContextService = /** @class */ (function () {
    function AppContextService(injector) {
        this.injector = injector;
        this.resourceCache = new Map();
    }
    AppContextService.prototype.getContext = function () {
        return this.injector.get(APP_CONTEXT) || {};
    };
    AppContextService.prototype.getEnvironment = function () {
        return this.injector.get(ENVIRONMENT);
    };
    AppContextService.prototype.getResourceCache = function (type) {
        if (!type || this.resourceCache.has(type)) {
            return type && this.resourceCache.get(type) || new Map();
        }
        var resource = this.getContext().resource;
        var cacheResource = new Map();
        Object.keys(resource).forEach(function (key) {
            var _a = resource[key], source = _a.source, sourceType = _a.type;
            if (sourceType === type) {
                cacheResource.set(key, of(source).pipe(map(cloneDeep)));
            }
        });
        this.resourceCache.set(type, cacheResource);
        return cacheResource;
    };
    Object.defineProperty(AppContextService.prototype, "fetch", {
        get: function () {
            return this.getContext().fetch;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppContextService.prototype, "isMicro", {
        get: function () {
            return this.getContext().isMicro;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppContextService.prototype, "microManage", {
        get: function () {
            return this.getContext().useMicroManage();
        },
        enumerable: false,
        configurable: true
    });
    AppContextService = __decorate([
        __param(0, Inject(Injector)),
        __metadata("design:paramtypes", [Injector])
    ], AppContextService);
    return AppContextService;
}());
export { AppContextService };
