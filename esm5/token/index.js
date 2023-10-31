import { InjectorToken } from '@fm/di';
export var HTTP_INTERCEPTORS = InjectorToken.get('HTTP_INTERCEPTORS');
export var APPLICATION_TOKEN = InjectorToken.get('APPLICATION_TOKEN');
export var APPLICATION_PLUGIN = InjectorToken.get('APPLICATION_PLUGIN');
export var APPLICATION_METADATA = InjectorToken.get('APPLICATION_METADATA');
export var HISTORY = InjectorToken.get('HISTORY');
export var MICRO_OPTIONS = InjectorToken.get('MICRO_MANAGER');
export var APP_INITIALIZER = InjectorToken.get('APP_INITIALIZER');
export var ROUTER_CONFIG = InjectorToken.get('ROUTER_CONFIG');
export var PLATFORM = InjectorToken.get('PLATFORM');
export var PlatformOptions = InjectorToken.get('PlatformOptions');
