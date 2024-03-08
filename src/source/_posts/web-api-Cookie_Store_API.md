---
title: "Web API - CookieStore"
date: "2024-03-08T03:40:40Z"
categories:
  - [JavaScript]

url: web-api-Cookie_Store_API
tags:
  - webapi
  - CookieStore

---


原文链接：[https://github.com/taoliujun/blog/issues/75](https://github.com/taoliujun/blog/issues/75)

<!--hexo

---
url: web-api-Cookie_Store_API
tags:
  - webapi
  - CookieStore
---

-->

# CookieStore

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API

**CookieStore**提供了对cookie的读取写入。相比`document.cookies`管理cookie的笨拙，本API更为明了。

## 接口

### CookieStore

使用`window.cookieStore`可获取本接口实例，提供了`get`、`set`、`getAll`、`delete`方法管理cookie，并支持cookie的所有特性如domain、path、expires等。

且还提供了`change`、`delete`事件监听。

### CookieStoreManager

订阅cookie变动。

## 方法和属性

略，见示例。

## 示例

示例：https://taoliujun.github.io/example/web-api/Cookie_Store_API/index.html

1. 写入、读取永久的cookie：

![image](https://github.com/taoliujun/blog/assets/5689134/d72df988-15d3-4214-ae9a-a6184cb5ba3e)

2. 写入、读取会过期的cookie：

![image](https://github.com/taoliujun/blog/assets/5689134/9a89eb49-7a7f-40f3-b523-6ce5bead38cd)




