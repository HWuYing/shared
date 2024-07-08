import { Injector } from '@hwy-fm/di';
import { Observable } from 'rxjs';
import { RouteInfo } from './type-api';
export declare class Router {
    private injector;
    private routerConfig;
    private routerList;
    constructor(injector: Injector, routerConfig: any);
    getRouterByPath(pathname: string): RouteInfo;
    loadModule(routeInfo: RouteInfo & {
        needRefresh?: boolean;
    }): Promise<boolean>;
    canActivate(routeInfo: RouteInfo): Observable<boolean>;
    loadResolve(routeInfo: RouteInfo): Observable<any>;
    private pathKey;
    private getExecList;
    private addRouteConfig;
    private getRouteItemByPath;
    private refreshRouterList;
    private toObservable;
}
