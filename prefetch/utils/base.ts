// @ts-nocheck
export function formatSourceData() {
  return {
    cookie: document.cookie.split("; ").reduce(function (result, cookie) {
      const [name, value] = cookie.split("=");
      result[name] = decodeURIComponent(value);
      return result;
    }, {}),
    query: location.search
      .slice(1)
      .split("&")
      .reduce(function (result, item) {
        var parts = item.split("=");
        result[decodeURIComponent(parts[0])] = decodeURIComponent(
          parts[1] || ""
        );
        return result;
      }, {}),
    hash: location.hash.slice(2),
    path: location.pathname,
  };
}

export const formatSourceDataStr = formatSourceData.toString();
