import { __awaiter, __rest } from "tslib";
// eslint-disable-next-line max-len
import { Injector, INJECTOR_SCOPE, InjectorToken, makeDecorator, makeMethodDecorator, makePropDecorator, reflectCapabilities, ROOT_SCOPE, setInjectableDef } from '@fm/di';
import { get } from 'lodash';
import { cloneDeepPlain } from '../../utility';
const APPLICATION = 'Application';
const DELETE_TOKEN = InjectorToken.get('DELETE_TOKEN');
export const PLATFORM_SCOPE = 'platform';
export const APPLICATION_TOKEN = InjectorToken.get('APPLICATION_TOKEN');
export const APPLICATION_METADATA = InjectorToken.get('APPLICATION_METADATA');
export class ApplicationContext {
    constructor(_platformProv = [], _prov = []) {
        this.dynamicInjectors = [];
        this._providers = this.addDefaultProvider([_prov], ROOT_SCOPE);
        this._platformProviders = this.addDefaultProvider([_platformProv, { provide: ApplicationContext, useValue: this }], PLATFORM_SCOPE);
    }
    addDefaultProvider(providers, scope) {
        const initFactory = (injector) => (this.addInjector(injector), scope);
        const deleteFactory = (injector) => ({ destroy: () => this.deleteInjector(injector) });
        providers.unshift([
            { provide: DELETE_TOKEN, useFactory: deleteFactory, deps: [Injector] },
            { provide: INJECTOR_SCOPE, useFactory: initFactory, deps: [Injector, DELETE_TOKEN] }
        ]);
        return providers;
    }
    addInjector(injector) {
        this.dynamicInjectors.push(injector);
    }
    deleteInjector(injector) {
        const indexOf = this.dynamicInjectors.findIndex((item) => item === injector);
        if (indexOf !== -1)
            this.dynamicInjectors.splice(indexOf, 1);
    }
    setDynamicProv(provider, isPlatform = false) {
        const provide = provider.provide;
        this.dynamicInjectors.forEach((injector) => {
            const needPush = isPlatform ? injector.scope === PLATFORM_SCOPE : injector.scope !== PLATFORM_SCOPE;
            if (needPush)
                injector.set(provide, provider);
        });
    }
    addProvider(provider) {
        this._providers.push(provider);
        this.setDynamicProv(provider);
    }
    addPlatformProvider(provider) {
        this._platformProviders.push(provider);
        this.setDynamicProv(provider, true);
    }
    getApp(injector, app, metadata = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const isProvide = typeof metadata === 'function' || metadata instanceof InjectorToken;
            const _metadata = isProvide ? yield Promise.resolve(((_a = injector.get(metadata)) === null || _a === void 0 ? void 0 : _a.load()) || {}) : metadata;
            injector.set(APPLICATION_METADATA, { provide: APPLICATION_METADATA, useFactory: () => cloneDeepPlain(_metadata) });
            injector.set(APPLICATION_TOKEN, { provide: APPLICATION_TOKEN, useValue: injector.get(app) });
            return injector.get(APPLICATION_TOKEN);
        });
    }
    registerApp(app, metadata = {}) {
        const appFactory = (injector) => __awaiter(this, void 0, void 0, function* () { return this.getApp(injector, app, metadata); });
        this.addProvider({ provide: APPLICATION_TOKEN, useFactory: appFactory, deps: [Injector] });
        setInjectableDef(app);
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
            const [provide] = reflectCapabilities.getPropAnnotations(target, prop);
            this.addProvider({ provide, useFactory, deps: [APPLICATION_METADATA] });
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
