---
title: FetchApi
group:
  title: 请求
  path: /request
nav:
  title: 常用方法
  path: /tools
---

# FetchApi

基于fetch封装，可开启加锁模式fetch，避免短时间内重复请求


## 交互规范

无

## Usage
### 基本用法

```js
import { FetchApi } from 'rct-components';
const api = new FetchApi({
  baseURL: 'http://localhost:4477',
  lock: 4,
  requestInterceptors: async config => {
    if (true) return config;
    return Promise.reject('request error');
  },
  responseInterceptors: async response => {
    if (true) return response;
    return Promise.reject('response error');
  }
})

api.requestApi({
  url: '',
  method: 'get',
  body: '',
  headers: {}
}).then(result => console.log(result))

```

## API

### FetchApi
|  参数名   | 描述  |  类型   | 可选参数  |
|  ----  | ----  |  ----  | ----  |
| baseURL  | 基础域名前缀 | `string` |  |
| lock  | 是否开启锁或指定相同请求间隔秒数 | `boolean` `number` | `true` `false` `number` |
| requestInterceptors | 请求拦截 | `Async Function` | async (config) => config |
| responseInterceptors | 响应拦截 | `Async Function` | async (response) => response |
> 其他api同fetch