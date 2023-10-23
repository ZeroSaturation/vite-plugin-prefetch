// @ts-nocheck
import { RequestConfig } from "src";
import {
  PREFETCH,
  stringify,
  generateHashStr,
  setCacheStr,
  formatSourceDataStr,
} from "../utils";

type FetchFunc = (url: string, options: unknown) => Promise<any>;

function formatParams(config, data) {
  const { url, method } = config;
  try {
    const { adapter } = config;
    const { body, header, query = {} } = adapter(data) || {};
    const q = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");
    return { url: q ? `${url}?${q}` : url, method, body, header };
  } catch (error) {
    return { url, method };
  }
}

export default function common(list: RequestConfig[], request: FetchFunc) {
  return `;(function SetupPrefetch(list) {
try {
  const PREFETCH = "${PREFETCH}";
  const sourceData = (${formatSourceDataStr})();
  ${generateHashStr}
  ${setCacheStr}
  ${request.toString()}
  ${formatParams.toString()}
  function send(config) {
    const params = formatParams(config, sourceData);
    const { url, ...options } = params;
    setCache(request(url, options), params, config.count || 1);
  }
  ${stringify(list)}.forEach(({ trigger, ...item }) => {
    if ((typeof trigger === 'function' && trigger(sourceData)) || trigger) {
      send(item);
    }
  });
} catch(e) {
  console.error('[prefetch-api error]', String(e));
}
})()`;
}
