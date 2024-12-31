import { __assign, __rest, __spreadArray } from "tslib";
/* eslint-disable max-len */
import { Inject, makeDecorator, makeMethodDecorator, setInjectableDef } from '@hwy-fm/di';
import { get } from 'lodash';
import { APPLICATION_METADATA, APPLICATION_PLUGIN, RUNTIME_INJECTOR } from '../token';
import { ApplicationContext } from '.';
var queue = [];
var transform = function (key) { return function (_meta, value, type, prop) { return get(value, key, type && type[prop]); }; };
export var registerProvider = function (provider) { return queue.push(function (ctx) { return ctx.addProvider(provider); }); };
export var createRegisterLoader = function (token) {
    var list;
    return function (loader) {
        if (!list)
            registerProvider({ provide: token, useValue: list = [] });
        list.push(loader);
    };
};
export var Register = makeDecorator('Register', registerProvider);
export var ApplicationPlugin = makeDecorator('ApplicationPlugin', undefined, function (plugin) {
    registerProvider({ provide: APPLICATION_PLUGIN, multi: true, useExisting: setInjectableDef(plugin) });
});
export var Prov = makeMethodDecorator('ProvDecorator', undefined, function (type, method, descriptor) {
    var meta = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        meta[_i - 3] = arguments[_i];
    }
    var _a = meta[0], token = _a === void 0 ? method : _a, _b = meta[1], _c = _b === void 0 ? {} : _b, _d = _c.deps, deps = _d === void 0 ? [] : _d, options = __rest(_c, ["deps"]);
    var useFactory = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return descriptor.value.apply(target, args);
    };
    registerProvider(__assign(__assign({ provide: token }, options), { useFactory: useFactory, deps: __spreadArray([type], deps, true) }));
});
export var makeApplication = function (handler) {
    function typeFn(type, metadata) {
        var applicationContext = new ApplicationContext();
        queue.forEach(function (fn) { return fn(applicationContext); });
        applicationContext.registerApp(setInjectableDef(type), metadata);
        handler(applicationContext);
    }
    return makeDecorator('Application', undefined, typeFn);
};
export var runtimeInjector = createRegisterLoader(RUNTIME_INJECTOR);
export var Input = function (key) { return Inject(APPLICATION_METADATA, { metadataName: 'InputPropDecorator', transform: transform(key) }); };
