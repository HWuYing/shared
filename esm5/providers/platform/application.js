import { __assign, __rest } from "tslib";
import { convertToFactory, InjectorToken, makeDecorator, makeMethodDecorator, setInjectableDef } from '@fm/di';
var APPLICATION = 'Application';
export var PLATFORM_SCOPE = 'platform';
export var APPLICATION_TOKEN = InjectorToken.get('APPLICATION_TOKEN');
export var APPLICATION_METDATA = InjectorToken.get('APPLICATION_METDATA');
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext(_platformProviders, _providers) {
        if (_platformProviders === void 0) { _platformProviders = []; }
        if (_providers === void 0) { _providers = []; }
        this._platformProviders = _platformProviders;
        this._providers = _providers;
    }
    ApplicationContext.prototype.registryApplication = function (app, metadata) {
        if (metadata === void 0) { metadata = {}; }
        this._providers.push({ provide: APPLICATION_TOKEN, useExisting: app });
        this._platformProviders.push({ provide: APPLICATION_METDATA, useValue: metadata });
        setInjectableDef(app, { token: app, providedIn: 'root', factory: convertToFactory(app) });
        this.runStart();
    };
    ApplicationContext.prototype.regeditStart = function (runStart) {
        this.runStart = runStart;
    };
    ApplicationContext.prototype.makeApplicationDecorator = function () {
        var _this = this;
        // eslint-disable-next-line max-len
        return makeDecorator(APPLICATION, undefined, function (injectableType, metadata) { return _this.registryApplication(injectableType, metadata); });
    };
    ApplicationContext.prototype.makeProvDecorator = function (name) {
        var _this = this;
        // eslint-disable-next-line max-params
        var typeFn = function (type, method, descriptor, token, options) {
            if (options === void 0) { options = {}; }
            var providedIn = options.providedIn, others = __rest(options, ["providedIn"]);
            var useFactory = function (target) { return descriptor.value.apply(target); };
            var providers = providedIn === PLATFORM_SCOPE ? _this._platformProviders : _this._providers;
            providers.push(__assign(__assign({ provide: token || method }, others), { useFactory: useFactory, deps: [type] }));
        };
        return makeMethodDecorator(name, undefined, typeFn);
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
