import { __rest } from "tslib";
/* eslint-disable max-len */
import { Inject, makeDecorator, makeMethodDecorator, setInjectableDef } from '@fm/di';
import { get } from 'lodash';
import { APPLICATION_METADATA } from '../token';
const queue = [];
const transform = (key) => (_meta, value, type, prop) => get(value, key, type[prop]);
export const registerProvider = (provider) => queue.push((applicationContext) => applicationContext.addProvider(provider));
export const ApplicationPlugin = makeDecorator('ApplicationPlugin', undefined, (plugin) => {
    setInjectableDef(plugin);
    queue.push((applicationContext) => applicationContext.registerPlugin(plugin));
});
export const Prov = makeMethodDecorator('MethodDecorator', undefined, (type, method, descriptor, ...meta) => {
    const [token = method, _a] = meta, _b = _a === void 0 ? {} : _a, { deps = [] } = _b, options = __rest(_b, ["deps"]);
    const useFactory = (target, ...args) => descriptor.value.apply(target, args);
    registerProvider(Object.assign(Object.assign({ provide: token }, options), { useFactory, deps: [type, ...deps] }));
});
export const Input = (key) => Inject(APPLICATION_METADATA, { metadataName: 'InputPropDecorator', transform: transform(key) });
export const execute = (applicationContext) => queue.forEach((fn) => fn(applicationContext));
