---
title: AxiosApi
group:
  title: 请求
  path: /request
nav:
  title: 常用方法
  path: /tools
---

# AxiosApi

基于axios封装，可开启加锁模式axios，避免短时间内重复请求


## 交互规范

无

## Usage
### 基本用法

```js
import { AxiosApi } from 'magic-components';
const api = new AxiosApi({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
  canCancel: true, // 是否开启锁模式
  requestInterceptors: config => { // 请求拦截
    return config;
  },
  responseInterceptors: response => { // 响应拦截
    if (false) return Promise.reject('error');
    return response;
  }
})

api.requestApi({
  url: '',
  method: 'GET',
  data: {},
  headers: {}
}).then(result => console.log(result))

```

## API

### AxiosApi
|  参数名   | 描述  |  类型   | 可选参数  |
|  ----  | ----  |  ----  | ----  |
| baseURL  | 基础域名前缀 | `string` |  |
| timeout  | 超时处理时常 | `number` |  |
| canCancel  | 是否开启锁 | `boolean` | `true` `false` |
| requestInterceptors | 请求拦截 | `Function` | (config) => config |
| responseInterceptors | 响应拦截 | `Function` | (response) => response |
> 其他api同axios