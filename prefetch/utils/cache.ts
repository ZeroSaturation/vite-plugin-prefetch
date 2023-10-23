import { PREFETCH } from "./const";
import { generateHash } from "./hash";

export function setCache(p: any, o: any, c?: number) {
  const key = generateHash(o);
  // @ts-expect-error
  window[PREFETCH] = window[PREFETCH] || {};
  // @ts-expect-error
  window[PREFETCH][key] = {
    count: c || 1,
    value: p,
  };
}

export function getCache<T>(params: any): Promise<T> | null {
  try {
    const { url, method, header, body } = params;
    const options = { url, method, header, body };
    const key = generateHash(options);
    // @ts-expect-error
    const cache = window[PREFETCH][key];
    if (cache && cache.count > 0) {
      cache.count -= 1;
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
