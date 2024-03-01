---
title: "Web API - Broadcast Channel"
date: "2024-03-01T10:00:22Z"
categories:
  - [JavaScript]

url: web-api-Broadcast_Channel_API
tags:
  - webapi
  - Broadcast Channel

---


原文链接：[https://github.com/taoliujun/blog/issues/59](https://github.com/taoliujun/blog/issues/59)

<!--hexo
---
url: web-api-Broadcast_Channel_API
tags:
  - webapi
  - Broadcast Channel
---
-->

# Broadcast Channel

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API

**Broadcast Channel**可以在**同源**情况下，在一种浏览器的不同窗口、标签页、frame中简单通信。

## 接口

### BroadcastChannel

传入频道名称，返回实例，包含了`message`事件来监听消息、`postMessage`方法来发送信息。

## 示例

示例：https://taoliujun.github.io/example/web-apis/Broadcast_Channel_API/index.html

1. 打开两个Chrome窗口，查看日志：

![image](https://github.com/taoliujun/blog/assets/5689134/8c0fdb6e-0318-49cd-8040-f90ca0738a13)




