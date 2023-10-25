import { PREFETCH } from "./const";
import { generateHash } from "./hash";
import type { RequestParams, Response } from "../types";

export function setCache<T>(p: Promise<Response<T>> | null, o: RequestParams, c?: number) {
  const key = generateHash(o);
  // @ts-expect-error
  window[PREFETCH] = window[PREFETCH] || {};
  // @ts-expect-error
  window[PREFETCH][key] = {
    count: c || 1,
    value: p,
  };
}

export function getCache<T>(
  params: RequestParams
): Promise<Response<T>> | null {
  try {
    // @ts-expect-error
    if (!window[PREFETCH] || !Object.keys(window[PREFETCH]).length) return null;
    const { url, method, header, body } = params;
    const options = { url, method, header, body };
    const key = generateHash(options);
    // @ts-expect-error
    const cache = window[PREFETCH][key];
    if (cache && cache.count > 0) {
      cache.count -= 1;
      if (cache.count < 1) {
        // @ts-expect-error
        delete window[PREFETCH][key];
      }
      return cache.value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const setCacheStr = `function setCache(p, o, c) {
  const key = generateHash(o);
  window[PREFETCH] = window[PREFETCH] || {};
  window[PREFETCH][key] = {
    count: c || 1,
    value: p,
  };
}`;
