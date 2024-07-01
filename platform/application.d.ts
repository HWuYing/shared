import { Provider, Type } from '@hwy-fm/di';
export declare const PLATFORM_SCOPE = "platform";
export declare class ApplicationContext {
    private dynamicInjectors;
    private _providers;
    private _platformProviders;
    constructor(_platformProv?: Provider[], _prov?: Provider[]);
    private addDefaultProvider;
    private addInjector;
    private deleteInjector;
    private setDynamicProv;
    addProvider(providers: Provider): void;
    private getApp;
    registerApp(app: Type, metadata?: any): void;
    get platformProviders(): Provider[];
    get providers(): Provider[];
}
