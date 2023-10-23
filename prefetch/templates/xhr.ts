// @ts-nocheck
import common from "./common";

export default function xhrTemplate(list) {
  // 请求适配器，必须命名为request
  function request(url, options) {
    return new Promise(function (resolve, reject) {
      const { method, header, body } = options;
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function onload() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: JSON.parse(xhr.responseText),
            status: xhr.status,
            statusText: xhr.statusText,
            headers: {},
            config: {},
            request: xhr,
          });
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function onerror() {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.setRequestHeader("Content-Type", "application/json");
      if (header) {
        Object.keys(header).forEach(function (key) {
          xhr.setRequestHeader(key, header[key]);
        });
      }
      xhr.send(body);
    });
  }
  return common(list, request);
}
