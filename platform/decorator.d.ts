import { Provider, TokenKey } from '@fm/di';
import type { ApplicationContext } from './application';
type ProvDecorator = (token: TokenKey, provider?: {
    providedIn?: string;
    [key: string]: any;
}) => MethodDecorator;
export declare const registerProvider: (provider: Provider) => number;
export declare const ApplicationPlugin: () => ClassDecorator;
export declare const Prov: ProvDecorator;
export declare const Input: (key: string) => ParameterDecorator & PropertyDecorator;
export declare const execute: (applicationContext: ApplicationContext) => void;
export {};
