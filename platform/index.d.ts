import { Provider } from '@fm/di';
import type { ApplicationContext } from './application';
export declare function createPlatformFactory<T>(createPlatform: ((appContext: ApplicationContext, providers: Provider[]) => T) | null, ...providers: Provider[]): (appContext: ApplicationContext, ...extraProviders: Provider[]) => T;
