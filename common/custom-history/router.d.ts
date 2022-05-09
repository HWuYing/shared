import { LocatorStorage } from '@fm/di';
import { Observable } from 'rxjs';
import { RouteInfo } from './type-api';
export declare class Router {
    private ls;
    private routerConfig;
    private routerList;
    constructor(ls: LocatorStorage, routerConfig: any);
    getRouterByPath(pathname: string): Promise<RouteInfo>;
    loadModule(routeInfo: RouteInfo): Promise<boolean>;
    canActivate(routeInfo: RouteInfo): Observable<boolean>;
    loadResolve(routeInfo: RouteInfo): Observable<any>;
    private pathKey;
    private getExecList;
    private addRouteConfig;
    private getRouteItemByPath;
    private refreshRouterList;
}
