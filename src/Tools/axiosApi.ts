const axios = require('axios');
/**
 * @param(string) baseURL 基础域名
 * @param(number) timeout 超时处理时常
 * @param(boolean) canCancel 是否开启锁模式
 * @param(function) requestInterceptors 请求拦截
 * @param(function) responseInterceptors 响应拦截
*/
class AxiosApi {
  baseURL?: string;
  timeout?: number;
  canCancel?: boolean;
  requestInterceptors?: Function | null;
  responseInterceptors?: Function | null;
  cancelTokens?: any;
  api: Function;
  constructor(
    { baseURL, timeout, canCancel, requestInterceptors, responseInterceptors }:
      { baseURL: string; timeout: number; canCancel: boolean; requestInterceptors: Function; responseInterceptors: Function }
  ) {
    this.baseURL = baseURL;
    this.timeout = timeout || 0;
    this.canCancel = canCancel || false;
    this.requestInterceptors = requestInterceptors || null;
    this.responseInterceptors = responseInterceptors || null;
    this.cancelTokens = {};
    this.api = this.createRequest();
  }

  createRequest() {
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    });
    // 添加请求拦截器
    instance.interceptors.request.use((config: any) => {
      if (this.requestInterceptors) return this.requestInterceptors && this.requestInterceptors(config);
      return config;
    }, function (error: Error) {
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use((response: Response) => {
      if (this.canCancel) {
        this.handlerCutCancel(response);
      }
      if (this.responseInterceptors) {
        return this.responseInterceptors && this.responseInterceptors(response);
      }
      return response
    }, (error: Error | any) => {
      if (this.canCancel && error.config) {
        this.handlerCutCancel(error);
      }
      return Promise.reject(error);
    });
    return instance;
  }

  async handlerAddCancel(config: any) {
    if (this.canCancel) { // 锁模式-加锁
      const tokenKey = `${config.method}&${config.url}`;
      if (this.cancelTokens[tokenKey]) {
        const CancelToken = this.cancelTokens[tokenKey];
        const source = CancelToken.source();
        config.cancelToken = source.token;
        source.cancel(`cancel request ${config.url}`);
      } else {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.cancelTokens[tokenKey] = CancelToken;
        config.cancelToken = source.token;
      }
    }
    return config;
  }

  handlerCutCancel(data: any) { // 锁模式-消锁
    const { config } = data;
    const tokenKey = `${config.method}&${config.url}`;
    if (this.cancelTokens && this.cancelTokens[tokenKey]) {
      delete this.cancelTokens[tokenKey];
    }
  }

  async requestApi(options: any) {
    const config = { url: '/', method: 'get', withCredentials: true, ...options, data: options.data || {} };
    if (config.data) delete config.data;
    const newConfig = await this.handlerAddCancel(config);
    return this.api(newConfig);
  }
}

export default AxiosApi;