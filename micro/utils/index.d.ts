export type Entrypoints = {
    [key: string]: {
        js: string[];
        css: string[];
    };
};
export declare const templateZip: (template: string, mapping?: any) => string;
export declare const createMicroElementTemplate: (microName: string, options: any) => string;
export declare const serializableAssets: (entrypoints: Entrypoints, ignores?: string[]) => {
    js: string[];
    links: string[];
};
