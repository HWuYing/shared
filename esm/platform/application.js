import { __awaiter } from "tslib";
/* eslint-disable no-await-in-loop */
import { Injector, INJECTOR_SCOPE, InjectorToken, makeDecorator, ROOT_SCOPE, setInjectableDef } from '@fm/di';
import { APPLICATION_METADATA, APPLICATION_PLUGIN, APPLICATION_TOKEN } from '../token';
import { cloneDeepPlain } from '../utility';
import { execute } from './decorator';
const APPLICATION = 'Application';
const DELETE_TOKEN = InjectorToken.get('DELETE_TOKEN');
export const PLATFORM_SCOPE = 'platform';
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
        const indexOf = this.dynamicInjectors.indexOf(injector);
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
        const isPlatform = provider.providedIn === PLATFORM_SCOPE;
        const providers = isPlatform ? this._platformProviders : this._providers;
        providers.push(provider);
        this.setDynamicProv(provider, isPlatform);
    }
    getApp(injector, app, metadata = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const isProvide = typeof metadata === 'function' || metadata instanceof InjectorToken;
            const _metadata = isProvide ? yield Promise.resolve(((_a = injector.get(metadata)) === null || _a === void 0 ? void 0 : _a.load()) || {}) : metadata;
            injector.set(APPLICATION_METADATA, { provide: APPLICATION_METADATA, useFactory: () => cloneDeepPlain(_metadata) });
            injector.set(APPLICATION_TOKEN, { provide: APPLICATION_TOKEN, useFactory: () => injector.get(app) });
            for (const plugin of (injector.get(APPLICATION_PLUGIN) || []).sort((item) => item.__order__ || 0)) {
                yield plugin.register();
            }
            return injector.get(APPLICATION_TOKEN);
        });
    }
    registerApp(app, metadata = {}) {
        const appFactory = (injector) => __awaiter(this, void 0, void 0, function* () { return this.getApp(injector, app, metadata); });
        this.addProvider({ provide: APPLICATION_TOKEN, useFactory: appFactory, deps: [Injector] });
        setInjectableDef(app);
        execute(this);
        this.runStart();
    }
    registerPlugin(plugin) {
        this.addProvider({ provide: APPLICATION_PLUGIN, multi: true, useExisting: plugin });
    }
    registerStart(runStart) {
        this.runStart = runStart;
    }
    makeApplicationDecorator() {
        return makeDecorator(APPLICATION, undefined, (injectableType, metadata) => this.registerApp(injectableType, metadata));
    }
    get platformProviders() {
        return this._platformProviders;
    }
    get providers() {
        return this._providers;
    }
}
