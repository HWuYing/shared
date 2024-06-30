import { Injector } from '@fm/di';
import { PLATFORM } from '../token';
export { ApplicationContext, PLATFORM_SCOPE } from './application';
export function createPlatformFactory(createPlatform, ...providers) {
    return (appContext, ...extraProviders) => {
        const injectorProviders = providers.concat(extraProviders);
        if (!createPlatform) {
            injectorProviders.push(appContext.platformProviders);
            return Injector.create(injectorProviders).get(PLATFORM);
        }
        return createPlatform(appContext, injectorProviders);
    };
}
