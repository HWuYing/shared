import { __awaiter } from "tslib";
/* eslint-disable no-await-in-loop */
import { Injector, INJECTOR_SCOPE, InjectorToken, ROOT_SCOPE } from '@hwy-fm/di';
import { forEach } from 'lodash';
import { APPLICATION_METADATA, APPLICATION_PLUGIN, APPLICATION_TOKEN, RUNTIME_INJECTOR } from '../token';
import { cloneDeepPlain } from '../utility';
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
            if (injector.scope === PLATFORM_SCOPE === isPlatform)
                injector.set(provide, provider);
        });
    }
    addProvider(providers) {
        forEach([providers], (provider) => {
            const isPlatform = provider.providedIn === PLATFORM_SCOPE;
            const _providers = isPlatform ? this._platformProviders : this._providers;
            _providers.push(provider);
            this.setDynamicProv(provider, isPlatform);
        });
    }
    getApp(injector_1, app_1) {
        return __awaiter(this, arguments, void 0, function* (injector, app, metadata = {}) {
            var _a, _b;
            const isProvide = typeof metadata === 'function' || metadata instanceof InjectorToken;
            const _metadata = isProvide ? yield Promise.resolve(((_a = injector.get(metadata)) === null || _a === void 0 ? void 0 : _a.load()) || {}) : metadata;
            injector.set(APPLICATION_METADATA, { provide: APPLICATION_METADATA, useFactory: () => cloneDeepPlain(_metadata) });
            injector.set(APPLICATION_TOKEN, { provide: APPLICATION_TOKEN, useFactory: () => injector.get(app) });
            (_b = injector.get(RUNTIME_INJECTOR)) === null || _b === void 0 ? void 0 : _b.forEach((fn) => fn(injector));
            for (const plugin of (injector.get(APPLICATION_PLUGIN) || []).sort((item) => item.__order__ || 0))
                yield plugin.register();
            return injector.get(APPLICATION_TOKEN);
        });
    }
    registerApp(app, metadata = {}) {
        const appFactory = (injector) => __awaiter(this, void 0, void 0, function* () { return this.getApp(injector, app, metadata); });
        this.addProvider({ provide: APPLICATION_TOKEN, useFactory: appFactory, deps: [Injector] });
    }
    get platformProviders() {
        return this._platformProviders;
    }
    get providers() {
        return this._providers;
    }
}
