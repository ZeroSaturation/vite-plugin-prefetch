import { getCache, formatSourceData } from "vite-plugin-prefetch-api/util";

export async function request(url: string, options: any) {
    const cacheFetch = getCache({ url, ...options });
    if (cacheFetch) {
        return cacheFetch;
    }
    return fetch(url, options).then((res) => res.json());
}

export const BaseInfo: any = formatSourceData();