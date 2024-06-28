import { Provider, Type } from '@fm/di';
type MetadataProps = {
    [key: string]: any;
};
export declare const PLATFORM_SCOPE = "platform";
export interface MetadataInfo {
    load(): Promise<MetadataProps> | MetadataProps;
}
export declare class ApplicationContext {
    private runStart;
    private dynamicInjectors;
    private _providers;
    private _platformProviders;
    constructor(_platformProv?: Provider[], _prov?: Provider[]);
    private addDefaultProvider;
    private addInjector;
    private deleteInjector;
    private setDynamicProv;
    addProvider(provider: Provider): void;
    private getApp;
    private registerApp;
    registerPlugin(plugin: Type<any>): void;
    registerStart(runStart: () => any): void;
    makeApplicationDecorator(): (metadata?: MetadataProps | Type<MetadataInfo>) => import("../../di/decorators").ClassDecorator;
    get platformProviders(): Provider[];
    get providers(): Provider[];
}
export {};
