import { Observable } from 'rxjs';
import { AppContextService } from '../../providers/app-context';
import { HttpHandler } from './http-handler';
export declare class HttpFetchHandler implements HttpHandler {
    private fetch;
    constructor(appContext: AppContextService);
    handle(req: RequestInfo, params?: RequestInit): Observable<Response>;
}
