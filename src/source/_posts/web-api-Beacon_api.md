---
title: "Web API - Beacon"
date: "2024-02-29T07:21:58Z"
categories:
  - [JavaScript]

url: web-api-Beacon_api
tags:
  - webapi
  - Beacon

---


原文链接：[https://github.com/taoliujun/blog/issues/53](https://github.com/taoliujun/blog/issues/53)

<!--hexo
---
url: web-api-Beacon_api
tags:
  - webapi
  - Beacon
---
-->

# Badging

> MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Beacon_API

**Beacon**用于发送请求到服务器，且不需要响应。浏览器会保证在页面卸载前，将请求运行完成。主要使用场景是发送统计数据。

## 方法

### sendBeacon

通过*POST*发送少量数据到服务器。

```javascript
navigator.sendBeacon(url, data);
```

## 示例

创建一个页面，放一个按钮用于发送`manual`统计数据：

```html
<button onclick="javascript:sendData('manual');">sendData</button>
```

在页面隐藏、卸载的时候发送`hidden`统计数据：

```javascript
document.addEventListener("visibilitychange", ()=> {
  if (document.visibilityState === "hidden") {
    sendData('hidden');
  }
});
```

发送统计数据的函数：

```javascript
let data = 0;

function sendData(source) {
  data += 1;
  // getUrl用于获取服务端地址
  navigator.sendBeacon(getUrl(), new URLSearchParams({ data, source }));
}
```

创建服务端，打印*request body*数据以测试点击按钮、关闭页面的效果，发现关闭页面后也发送了数据。

```bash
body: [Object: null prototype] { data: '1', source: 'manual' }
body: [Object: null prototype] { data: '2', source: 'hidden' }
```


示例：https://taoliujun.github.io/example/web-apis/Beacon_API/index.html

> 需要服务端配合打印日志。服务端代码见：https://taoliujun.github.io/example/web-apis/Beacon_API/http.js



