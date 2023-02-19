import { Observable } from 'rxjs';
export declare abstract class HttpHandler {
    abstract handle(req: RequestInfo | string, params?: RequestInit): Observable<Response>;
}
