export type SourceData = {
  cookie: Record<string, unknown>;
  query: Record<string, unknown>;
  hash: string;
  path: string;
};
export type ParamsInfo = {
  header?: Record<string, unknown>;
  query?: Record<string, unknown>;
  body?: unknown;
};
export type ParamsAdaptFunc = (data: SourceData) => ParamsInfo;
export type TriggerFunc = (data: SourceData) => boolean;
export interface RequestConfig {
  url: string;
  method: "get" | "post" | "put" | "delete";
  count?: number;
  adapter?: ParamsAdaptFunc;
  trigger?: TriggerFunc | boolean;
}

export interface PluginConfig {
  api?: "xhr" | "fetch";
  minify?: boolean;
  list: RequestConfig[];
}


export type RequestParams = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  header?: Record<string, unknown>;
  body?: unknown;
}

export type Response<T> = {
  data: T;
  status: number;
  statusText: string;
}
export type ResponseReject = {
  status: number;
  statusText: string;
}