import { __awaiter, __generator } from "tslib";
/* eslint-disable no-await-in-loop */
import { Injector, INJECTOR_SCOPE, InjectorToken, makeDecorator, ROOT_SCOPE, setInjectableDef } from '@fm/di';
import { APPLICATION_METADATA, APPLICATION_PLUGIN, APPLICATION_TOKEN } from '../token';
import { cloneDeepPlain } from '../utility';
import { execute } from './decorator';
var APPLICATION = 'Application';
var DELETE_TOKEN = InjectorToken.get('DELETE_TOKEN');
export var PLATFORM_SCOPE = 'platform';
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext(_platformProv, _prov) {
        if (_platformProv === void 0) { _platformProv = []; }
        if (_prov === void 0) { _prov = []; }
        this.dynamicInjectors = [];
        this._providers = this.addDefaultProvider([_prov], ROOT_SCOPE);
        this._platformProviders = this.addDefaultProvider([_platformProv, { provide: ApplicationContext, useValue: this }], PLATFORM_SCOPE);
    }
    ApplicationContext.prototype.addDefaultProvider = function (providers, scope) {
        var _this = this;
        var initFactory = function (injector) { return (_this.addInjector(injector), scope); };
        var deleteFactory = function (injector) { return ({ destroy: function () { return _this.deleteInjector(injector); } }); };
        providers.unshift([
            { provide: DELETE_TOKEN, useFactory: deleteFactory, deps: [Injector] },
            { provide: INJECTOR_SCOPE, useFactory: initFactory, deps: [Injector, DELETE_TOKEN] }
        ]);
        return providers;
    };
    ApplicationContext.prototype.addInjector = function (injector) {
        this.dynamicInjectors.push(injector);
    };
    ApplicationContext.prototype.deleteInjector = function (injector) {
        var indexOf = this.dynamicInjectors.indexOf(injector);
        if (indexOf !== -1)
            this.dynamicInjectors.splice(indexOf, 1);
    };
    ApplicationContext.prototype.setDynamicProv = function (provider, isPlatform) {
        if (isPlatform === void 0) { isPlatform = false; }
        var provide = provider.provide;
        this.dynamicInjectors.forEach(function (injector) {
            var needPush = isPlatform ? injector.scope === PLATFORM_SCOPE : injector.scope !== PLATFORM_SCOPE;
            if (needPush)
                injector.set(provide, provider);
        });
    };
    ApplicationContext.prototype.addProvider = function (provider) {
        var isPlatform = provider.providedIn === PLATFORM_SCOPE;
        var providers = isPlatform ? this._platformProviders : this._providers;
        providers.push(provider);
        this.setDynamicProv(provider, isPlatform);
    };
    ApplicationContext.prototype.getApp = function (injector, app, metadata) {
        var _a;
        if (metadata === void 0) { metadata = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var isProvide, _metadata, _b, _i, _c, plugin;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        isProvide = typeof metadata === 'function' || metadata instanceof InjectorToken;
                        if (!isProvide) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve(((_a = injector.get(metadata)) === null || _a === void 0 ? void 0 : _a.load()) || {})];
                    case 1:
                        _b = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = metadata;
                        _d.label = 3;
                    case 3:
                        _metadata = _b;
                        injector.set(APPLICATION_METADATA, { provide: APPLICATION_METADATA, useFactory: function () { return cloneDeepPlain(_metadata); } });
                        injector.set(APPLICATION_TOKEN, { provide: APPLICATION_TOKEN, useValue: injector.get(app) });
                        _i = 0, _c = (injector.get(APPLICATION_PLUGIN) || []).sort(function (item) { return item.__order__ || 0; });
                        _d.label = 4;
                    case 4:
                        if (!(_i < _c.length)) return [3 /*break*/, 7];
                        plugin = _c[_i];
                        return [4 /*yield*/, plugin.register()];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, injector.get(APPLICATION_TOKEN)];
                }
            });
        });
    };
    ApplicationContext.prototype.registerApp = function (app, metadata) {
        var _this = this;
        if (metadata === void 0) { metadata = {}; }
        var appFactory = function (injector) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.getApp(injector, app, metadata)];
        }); }); };
        this.addProvider({ provide: APPLICATION_TOKEN, useFactory: appFactory, deps: [Injector] });
        setInjectableDef(app);
        execute(this);
        this.runStart();
    };
    ApplicationContext.prototype.registerPlugin = function (plugin) {
        this.addProvider({ provide: APPLICATION_PLUGIN, multi: true, useExisting: plugin });
    };
    ApplicationContext.prototype.registerStart = function (runStart) {
        this.runStart = runStart;
    };
    ApplicationContext.prototype.makeApplicationDecorator = function () {
        var _this = this;
        return makeDecorator(APPLICATION, undefined, function (injectableType, metadata) { return _this.registerApp(injectableType, metadata); });
    };
    Object.defineProperty(ApplicationContext.prototype, "platformProviders", {
        get: function () {
            return this._platformProviders;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApplicationContext.prototype, "providers", {
        get: function () {
            return this._providers;
        },
        enumerable: false,
        configurable: true
    });
    return ApplicationContext;
}());
export { ApplicationContext };
