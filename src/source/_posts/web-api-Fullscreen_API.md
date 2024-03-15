---
title: "Web API - Fullscreen"
date: "2024-03-15T03:03:59Z"
categories:
  - [Web API]

url: web-api-Fullscreen_API
tags:
  - webapi
  - Fullscreen

---


原文链接：[https://github.com/taoliujun/blog/issues/87](https://github.com/taoliujun/blog/issues/87)

<!--hexo

---
url: web-api-Fullscreen_API
tags:
  - webapi
  - Fullscreen
---

-->

# Fullscreen

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

**Fullscreen**可设置元素全屏，或退出全屏。

> 全屏元素只能有一个。

## 接口

无。

## 属性和方法

### Document.fullscreenElement

返回当前进入全屏的元素节点。

### Element.requestFullscreen()

将节点进入全屏。

### Document.exitFullscreen()

退出全屏。

## 事件

### fullscreenchange

全屏状态变化的事件，在事件回调中，访问`Document.fullscreenElement`可判断是否处于全屏状态。

## 示例

示例：https://taoliujun.github.io/example/web-api/Fullscreen_API/index.html




