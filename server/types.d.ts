export interface IProxyBackendOptions {
  url: string;
  auth?: {
    username: string;
    password: string
  };
}
export interface Config {
  port?: number;
  secret?: string;
  env?: string;
  fileLog?: string | boolean;
  internalApi?: IProxyBackendOptions;
}

interface IProxyOptions {
  url: string;
  method: string;
  body?: any;
  qs?: any;
  json?: boolean;
  useQuerystring?: boolean;
  headers?: any;
  auth?: any;
  proxyBackend: string;
}
