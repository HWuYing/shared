import { __assign, __rest } from "tslib";
// eslint-disable-next-line max-len
import { Injectable, Injector, INJECTOR_SCOPE, InjectorToken, makeDecorator, makeMethodDecorator, makePropDecorator, ROOT_SCOPE } from '@fm/di';
import { get } from 'lodash';
import { cloneDeepPlain } from '../../utility';
var APPLICATION = 'Application';
var DELETE_TOKEN = InjectorToken.get('DELETE_TOKEN');
export var PLATFORM_SCOPE = 'platform';
export var APPLICATION_TOKEN = InjectorToken.get('APPLICATION_TOKEN');
export var APPLICATION_METDATA = InjectorToken.get('APPLICATION_METDATA');
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext(_platformProviders, _providers) {
        if (_platformProviders === void 0) { _platformProviders = []; }
        if (_providers === void 0) { _providers = []; }
        this._platformProviders = _platformProviders;
        this._providers = _providers;
        this.dynamicInjectors = [];
        this.addDefaultProvider(_providers, ROOT_SCOPE);
        this.addDefaultProvider(_platformProviders, PLATFORM_SCOPE);
    }
    ApplicationContext.prototype.addDefaultProvider = function (providers, scope) {
        var _this = this;
        var initFactory = function (injector) { return (_this.addInjector(injector), scope); };
        var deleteFactory = function (injector) { return ({ destroy: function () { return _this.deleteInjector(injector); } }); };
        providers.unshift([
            { provide: DELETE_TOKEN, useFactory: deleteFactory, deps: [Injector] },
            { provide: INJECTOR_SCOPE, useFactory: initFactory, deps: [Injector, DELETE_TOKEN] }
        ]);
    };
    ApplicationContext.prototype.addInjector = function (injector) {
        this.dynamicInjectors.push(injector);
    };
    ApplicationContext.prototype.deleteInjector = function (injector) {
        var indexOf = this.dynamicInjectors.findIndex(function (item) { return item === injector; });
        if (indexOf !== -1)
            this.dynamicInjectors.splice(indexOf, 1);
    };
    ApplicationContext.prototype.setDynamicProvider = function (provider, isPlatform) {
        if (isPlatform === void 0) { isPlatform = false; }
        var provide = provider.provide;
        this.dynamicInjectors.forEach(function (injector) {
            var needPush = isPlatform ? injector.scope === PLATFORM_SCOPE : injector.scope !== PLATFORM_SCOPE;
            if (needPush)
                injector.set(provide, provider);
        });
    };
    ApplicationContext.prototype.addProvider = function (provider) {
        this._providers.push(provider);
        this.setDynamicProvider(provider);
    };
    ApplicationContext.prototype.addPlatformProvider = function (provider) {
        this._platformProviders.push(provider);
        this.setDynamicProvider(provider, true);
    };
    ApplicationContext.prototype.registryApp = function (app, metadata) {
        if (metadata === void 0) { metadata = {}; }
        this.addProvider({ provide: APPLICATION_TOKEN, useExisting: app });
        this.addPlatformProvider({ provide: APPLICATION_METDATA, useFactory: function () { return cloneDeepPlain(metadata); } });
        Injectable(metadata)(app);
        this.runStart();
    };
    ApplicationContext.prototype.regeditStart = function (runStart) {
        this.runStart = runStart;
    };
    ApplicationContext.prototype.makeApplicationDecorator = function () {
        var _this = this;
        return makeDecorator(APPLICATION, undefined, function (injectableType, metadata) { return _this.registryApp(injectableType, metadata); });
    };
    ApplicationContext.prototype.makeProvDecorator = function (name) {
        var _this = this;
        var typeFn = function (type, method, descriptor) {
            var meta = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                meta[_i - 3] = arguments[_i];
            }
            var _a = meta[0], token = _a === void 0 ? method : _a, _b = meta[1], options = _b === void 0 ? {} : _b;
            var providedIn = options.providedIn, others = __rest(options, ["providedIn"]);
            var useFactory = function (target) { return descriptor.value.apply(target); };
            var providers = providedIn === PLATFORM_SCOPE ? _this.addPlatformProvider : _this.addProvider;
            providers.call(_this, __assign(__assign({ provide: token }, others), { useFactory: useFactory, deps: [type] }));
        };
        return makeMethodDecorator(name, undefined, typeFn);
    };
    ApplicationContext.prototype.makePropInput = function (name) {
        var _this = this;
        var typeFn = function (target, prop, key) {
            var useFactory = function (metadata) { return get(metadata, key); };
            _this.addProvider({ provide: target.__prop__metadata__[prop][0], useFactory: useFactory, deps: [APPLICATION_METDATA] });
        };
        return makePropDecorator(name, function (key) { return ({ key: key }); }, typeFn);
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
