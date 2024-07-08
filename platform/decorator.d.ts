import { Injector, Provider, TokenKey, Type } from '@hwy-fm/di';
import { ApplicationContext } from '.';
type MetadataProps = {
    [key: string]: any;
};
type ProvDecorator = (token: TokenKey, provider?: {
    providedIn?: string;
    [key: string]: any;
}) => MethodDecorator;
export interface PluginIntercept {
    register(): Promise<void>;
}
export interface MetadataInfo {
    load(): Promise<MetadataProps> | MetadataProps;
}
export declare const registerProvider: (provider: Provider) => number;
export declare const createRegisterLoader: <T>(token: TokenKey) => (loader: T) => void;
export declare const Register: (provider: Provider) => ClassDecorator;
export declare const ApplicationPlugin: () => ClassDecorator;
export declare const Prov: ProvDecorator;
export declare const makeApplication: (handler: (applicationContext: ApplicationContext) => void) => (metadata?: Type<MetadataInfo> | MetadataProps) => ClassDecorator;
export declare const runtimeInjector: (loader: (injector: Injector) => void) => void;
export declare const Input: (key: string) => import("@hwy-fm/di").TargetDecorator;
export {};
