import { InjectorToken, Provider } from '@fm/di';
import { ApplicationContext } from './application';
export declare const PlatformOptions: InjectorToken;
export { APPLICATION_METDATA, APPLICATION_TOKEN, ApplicationContext, PLATFORM_SCOPE } from './application';
export declare function createPlafformFactory<T>(createPlatform: ((appContext: ApplicationContext, providers: Provider[]) => T) | null, ...providers: Provider[]): (appContext: ApplicationContext, ...extraProviders: Provider[]) => T;
