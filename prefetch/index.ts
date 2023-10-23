import type { Plugin } from "vite";
import UglifyJS from "uglify-js";
import fetchTemplate from "./templates/fetch";
import xhrTemplate from "./templates/xhr";
import type { PluginConfig, RequestConfig, TriggerFunc } from "./types";

const defaultPluginConfig: PluginConfig = {
  api: "fetch",
  list: [],
  minify: true,
};

function checkCount(count: unknown) {
  try {
    const c = parseInt(String(count));
    if (isNaN(c) || c < 1) {
      return 1;
    }
    return c;
  } catch (error) {
    return 1;
  }
}
function checkTrigger(
  trigger?: TriggerFunc | boolean
): TriggerFunc | undefined {
  if (trigger && typeof trigger === "function") {
    return trigger;
  }
  // trigger === 0、false、
  if (trigger !== false && trigger !== null) {
    return undefined;
  }
}

function formatConfig(list: RequestConfig[]) {
  return (
    list
      // trigger == true or trigger === undefined
      .filter((item) => item.trigger || item.trigger === undefined)
      .map((item) => {
        const trigger = checkTrigger(item.trigger);
        const config = {
          ...item,
          count: checkCount(item.count),
        };
        if (trigger) {
          config.trigger = trigger;
        }
        return config;
      })
  );
}

function formatPrefetchScript(config: PluginConfig) {
  const { api = "fetch", minify = true } = config;
  const script =
    api === "fetch" ? fetchTemplate(config.list) : xhrTemplate(config.list);
  if (minify) {
    const result = UglifyJS.minify(script);
    if (!result.error) {
      return result.code;
    }
  }
  return script;
}

export function PrefetchPlugin(userConfig: PluginConfig): Plugin {
  const config = Object.assign({}, defaultPluginConfig, userConfig);
  config.list = formatConfig(config.list);
  return {
    name: "vite-plugin-prefetch",
    transformIndexHtml: {
      enforce: "post",
      transform() {
        if (Array.isArray(config.list) && config.list.length) {
          return [
            {
              tag: "script",
              children: formatPrefetchScript(config),
              injectTo: "head",
            },
          ];
        }
      },
    },
  };
}

export default PrefetchPlugin;
