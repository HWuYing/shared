import { Observable } from 'rxjs';
import { HttpHandler } from "./http-handler";
export declare class HttpClient {
    private handler;
    constructor(handler: HttpHandler);
    request(method: string, req: RequestInfo | string, params?: RequestInit): Observable<Response>;
    get<T>(req: RequestInfo | string, params?: RequestInit): Observable<T>;
    getText(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    post<T>(req: RequestInfo | string, params?: RequestInit): Observable<T>;
    put<T>(req: RequestInfo | string, params?: RequestInit): Observable<T>;
    delete<T>(req: RequestInfo | string, params?: RequestInit): Observable<T>;
}
