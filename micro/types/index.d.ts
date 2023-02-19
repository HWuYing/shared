import { Observable, Subject } from 'rxjs';
export interface MicroStoreInterface {
    onMounted(container: HTMLElement, options?: any): Promise<void>;
    unMounted(container: HTMLElement): Promise<void>;
}
export interface SharedDataInterface {
    set(key: string, value: any): void;
    get<T>(key: string): T;
}
export interface MicroManageInterface {
    readonly loaderStyleSubject?: Subject<HTMLStyleElement>;
    readonly sharedData: SharedDataInterface;
    bootstrapMicro(microName: string): Observable<MicroStoreInterface>;
}
