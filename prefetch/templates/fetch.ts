// @ts-nocheck
import common from "./common";

export default function fetchTemplate(list) {
  // 请求适配器，必须命名为request
  function request(url, options) {
    const { header, method = "get" } = options;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (header) {
      Object.keys(header).forEach(function (key) {
        headers.append(key, header[key]);
      });
    }
    const body = options.body ? JSON.stringify(options.body) : undefined;
    const params = {
      body,
      headers,
      method: method.toLocaleUpperCase(),
    };
    return fetch(url, params).then(
      (res) =>
        res.ok
          ? {
              data: res.json(),
              status: res.status,
              statusText: res.statusText,
              headers: {},
              config: {},
              request: res,
            }
          : Promise.reject({ status: res.status, statusText: res.statusText }),
      () => Promise.rejects({ status: res.status, statusText: res.statusText })
    );
  }
  return common(list, request);
}
