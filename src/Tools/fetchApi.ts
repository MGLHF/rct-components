/**
 * @param(string) baseURL 基础域名
 * @param(number|boolean) lock 超时处理时长，number按指定时长请求，boolean则按请求响应时间
 * @param(async function) requestInterceptors 请求拦截
 * @param(async function) responseInterceptors 响应拦截
*/

interface DefaultOptions {
  requestInterceptors: (config: object) => Promise<boolean> | object;
  responseInterceptors: (response: Response | undefined) => Promise<boolean> | Response;
  baseURL: string;
  lock: boolean;
}
class FetchApi {
  defaultOptions: DefaultOptions;
  requestQueue: any;
  cancelQueue: any;
  constructor(defaultOptions = {
    requestInterceptors: async () => true,
    responseInterceptors: async () => true,
    baseURL: '',
    lock: false
  }) {
    this.defaultOptions = defaultOptions;
    this.requestQueue = {};
    this.cancelQueue = {};
  }

  async cancelBeforeRequest(key: string, obj: any) {
    return new Promise((resolve, reject) => {
      if (!this.cancelQueue[key]) {
        this.cancelQueue[key] = true;
        return resolve(true);
      }
      const controller = new AbortController();
      const { signal } = controller;
      obj.signal = signal;
      controller.abort();
      return reject({ errMsg: 'cancel request', message: '请求被取消' });
    });
  }

  async cancelAfterRequest(key: string) {
    return new Promise((resolve) => {
      if (this.cancelQueue[key]) {
        delete this.cancelQueue[key];
      }
      return resolve(true);
    });
  }

  async lockMode(obj: any, key: string) {
    // 开启时间锁，相同请求n秒内仅可发送一次
    if (obj.lock && typeof obj.lock === 'number') {
      const nowTime = new Date().getTime();
      if (!this.requestQueue[key] || (this.requestQueue[key] && nowTime - this.requestQueue[key] > obj.lock * 1000)) {
        this.requestQueue[key] = nowTime;
      } else {
        const controller = new AbortController();
        const { signal } = controller;
        obj.signal = signal;
        controller.abort();
        return Promise.reject({ errMsg: 'cancel request', message: '重复请求，被取消' });
      }
    }

    // 开启锁，相同请求未返回前不可再次请求
    if (obj.lock && typeof obj.lock === 'boolean') {
      await this.cancelBeforeRequest(key, obj);
    }
    return Promise.resolve();
  }

  async requestApi(options: any) {
    const obj = { ...this.defaultOptions, ...options };
    obj.method = obj.method || 'get';
    const key = `${obj.method}&${obj.baseURL}${obj.url}`;

    // 请求参数格式化
    let requestBody = JSON.parse(JSON.stringify(obj));
    if (this.defaultOptions.requestInterceptors) requestBody = await this.defaultOptions.requestInterceptors(requestBody); // 请求拦截
    const url = `${requestBody.baseURL}${requestBody.url}`;
    requestBody = this.deleteRequestBody(requestBody);

    // 锁判断
    await this.lockMode(obj, key);

    try {
      let response: Response | boolean = await fetch(url, requestBody);
      if (obj.lock && typeof obj.lock === 'boolean') await this.cancelAfterRequest(key);
      if (this.defaultOptions.responseInterceptors) response = await this.defaultOptions.responseInterceptors(response); // 相应拦截
      if (response && response instanceof Response) return response.json();
    } catch (error) {
      if (obj.lock && typeof obj.lock === 'boolean') await this.cancelAfterRequest(key);
      else if (obj.lock && typeof obj.lock === 'number') this.requestQueue[key] = new Date().getTime();
    }
  }

  deleteRequestBody(newObj: any) {
    const obj = JSON.parse(JSON.stringify(newObj));
    delete obj.baseURL;
    delete obj.url;
    delete obj.lock;
    delete obj.requestInterceptors;
    delete obj.responseInterceptors;
    return obj;
  }
}

export default FetchApi;