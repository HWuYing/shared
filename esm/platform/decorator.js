import { __rest } from "tslib";
/* eslint-disable max-len */
import { Inject, makeDecorator, makeMethodDecorator, setInjectableDef } from '@hwy-fm/di';
import { get } from 'lodash';
import { APPLICATION_METADATA, APPLICATION_PLUGIN, RUNTIME_INJECTOR } from '../token';
import { ApplicationContext } from '.';
const queue = [];
const transform = (key) => (_meta, value, type, prop) => get(value, key, type && type[prop]);
export const registerProvider = (provider) => queue.push((ctx) => ctx.addProvider(provider));
export const createRegisterLoader = function (token) {
    let list;
    return (loader) => {
        if (!list)
            registerProvider({ provide: token, useValue: list = [] });
        list.push(loader);
    };
};
export const Register = makeDecorator('Register', registerProvider);
export const ApplicationPlugin = makeDecorator('ApplicationPlugin', undefined, (plugin) => {
    registerProvider({ provide: APPLICATION_PLUGIN, multi: true, useExisting: setInjectableDef(plugin) });
});
export const Prov = makeMethodDecorator('ProvDecorator', undefined, (type, method, descriptor, ...meta) => {
    const [token = method, _a] = meta, _b = _a === void 0 ? {} : _a, { deps = [] } = _b, options = __rest(_b, ["deps"]);
    const useFactory = (target, ...args) => descriptor.value.apply(target, args);
    registerProvider(Object.assign(Object.assign({ provide: token }, options), { useFactory, deps: [type, ...deps] }));
});
export const makeApplication = (handler) => {
    function typeFn(type, metadata) {
        const applicationContext = new ApplicationContext();
        queue.forEach((fn) => fn(applicationContext));
        applicationContext.registerApp(setInjectableDef(type), metadata);
        handler(applicationContext);
    }
    return makeDecorator('Application', (metadata) => ({ metadata }), typeFn);
};
export const runtimeInjector = createRegisterLoader(RUNTIME_INJECTOR);
export const Input = (key) => Inject(APPLICATION_METADATA, { metadataName: 'InputPropDecorator', transform: transform(key) });
