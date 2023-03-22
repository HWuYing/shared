import { __rest } from "tslib";
import { convertToFactory, InjectorToken, makeDecorator, makeMethodDecorator, setInjectableDef } from '@fm/di';
const APPLICATION = 'Application';
export const PLATFORM_SCOPE = 'platform';
export const APPLICATION_TOKEN = InjectorToken.get('APPLICATION_TOKEN');
export const APPLICATION_METDATA = InjectorToken.get('APPLICATION_METDATA');
export class ApplicationContext {
    constructor(_platformProviders = [], _providers = []) {
        this._platformProviders = _platformProviders;
        this._providers = _providers;
    }
    registryApplication(app, metadata = {}) {
        this._providers.push({ provide: APPLICATION_TOKEN, useExisting: app });
        this._platformProviders.push({ provide: APPLICATION_METDATA, useValue: metadata });
        setInjectableDef(app, { token: app, providedIn: 'root', factory: convertToFactory(app) });
        this.runStart();
    }
    regeditStart(runStart) {
        this.runStart = runStart;
    }
    makeApplicationDecorator() {
        // eslint-disable-next-line max-len
        return makeDecorator(APPLICATION, undefined, (injectableType, metadata) => this.registryApplication(injectableType, metadata));
    }
    makeProvDecorator(name) {
        // eslint-disable-next-line max-params
        const typeFn = (type, method, descriptor, token, options = {}) => {
            const { providedIn } = options, others = __rest(options, ["providedIn"]);
            const useFactory = (target) => descriptor.value.apply(target);
            const providers = providedIn === PLATFORM_SCOPE ? this._platformProviders : this._providers;
            providers.push(Object.assign(Object.assign({ provide: token || method }, others), { useFactory, deps: [type] }));
        };
        return makeMethodDecorator(name, undefined, typeFn);
    }
    get platformProviders() {
        return this._platformProviders;
    }
    get providers() {
        return this._providers;
    }
}
