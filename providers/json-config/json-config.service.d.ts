import { LocatorStorage } from '@fm/di';
import { Observable } from 'rxjs';
import { AppContextService } from '../app-context';
export declare abstract class JsonConfigService {
    protected ls: LocatorStorage;
    protected appContext: AppContextService;
    protected cacheConfig: Map<string, Observable<object>>;
    protected abstract getServerFetchData(url: string): Observable<object>;
    constructor(ls: LocatorStorage);
    getJsonConfig(url: string): Observable<object>;
}
