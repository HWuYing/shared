import { __rest } from "tslib";
// eslint-disable-next-line max-len
import { Injectable, Injector, INJECTOR_SCOPE, InjectorToken, makeDecorator, makeMethodDecorator, makePropDecorator, ROOT_SCOPE } from '@fm/di';
import { get } from 'lodash';
import { cloneDeepPlain } from '../../utility';
const APPLICATION = 'Application';
const DELETE_TOKEN = InjectorToken.get('DELETE_TOKEN');
export const PLATFORM_SCOPE = 'platform';
export const APPLICATION_TOKEN = InjectorToken.get('APPLICATION_TOKEN');
export const APPLICATION_METADATA = InjectorToken.get('APPLICATION_METADATA');
export class ApplicationContext {
    constructor(_platformProviders = [], _providers = []) {
        this._platformProviders = _platformProviders;
        this._providers = _providers;
        this.dynamicInjectors = [];
        this.addDefaultProvider(_providers, ROOT_SCOPE);
        this.addDefaultProvider(_platformProviders, PLATFORM_SCOPE);
    }
    addDefaultProvider(providers, scope) {
        const initFactory = (injector) => (this.addInjector(injector), scope);
        const deleteFactory = (injector) => ({ destroy: () => this.deleteInjector(injector) });
        providers.unshift([
            { provide: DELETE_TOKEN, useFactory: deleteFactory, deps: [Injector] },
            { provide: INJECTOR_SCOPE, useFactory: initFactory, deps: [Injector, DELETE_TOKEN] }
        ]);
    }
    addInjector(injector) {
        this.dynamicInjectors.push(injector);
    }
    deleteInjector(injector) {
        const indexOf = this.dynamicInjectors.findIndex((item) => item === injector);
        if (indexOf !== -1)
            this.dynamicInjectors.splice(indexOf, 1);
    }
    setDynamicProvider(provider, isPlatform = false) {
        const provide = provider.provide;
        this.dynamicInjectors.forEach((injector) => {
            const needPush = isPlatform ? injector.scope === PLATFORM_SCOPE : injector.scope !== PLATFORM_SCOPE;
            if (needPush)
                injector.set(provide, provider);
        });
    }
    addProvider(provider) {
        this._providers.push(provider);
        this.setDynamicProvider(provider);
    }
    addPlatformProvider(provider) {
        this._platformProviders.push(provider);
        this.setDynamicProvider(provider, true);
    }
    registerApp(app, metadata = {}) {
        this.addProvider({ provide: APPLICATION_TOKEN, useExisting: app });
        this.addPlatformProvider({ provide: APPLICATION_METADATA, useFactory: () => cloneDeepPlain(metadata) });
        Injectable(metadata)(app);
        this.runStart();
    }
    registerStart(runStart) {
        this.runStart = runStart;
    }
    makeApplicationDecorator() {
        return makeDecorator(APPLICATION, undefined, (injectableType, metadata) => this.registerApp(injectableType, metadata));
    }
    makeProvDecorator(name) {
        const typeFn = (type, method, descriptor, ...meta) => {
            const [token = method, options = {}] = meta;
            const { providedIn } = options, others = __rest(options, ["providedIn"]);
            const useFactory = (target) => descriptor.value.apply(target);
            const providers = providedIn === PLATFORM_SCOPE ? this.addPlatformProvider : this.addProvider;
            providers.call(this, Object.assign(Object.assign({ provide: token }, others), { useFactory, deps: [type] }));
        };
        return makeMethodDecorator(name, undefined, typeFn);
    }
    makePropInput(name) {
        const typeFn = (target, prop, key) => {
            const useFactory = (metadata) => get(metadata, key);
            this.addProvider({ provide: target.__prop__metadata__[prop][0], useFactory, deps: [APPLICATION_METADATA] });
        };
        return makePropDecorator(name, (key) => ({ key }), typeFn);
    }
    get platformProviders() {
        return this._platformProviders;
    }
    get providers() {
        return this._providers;
    }
}
