---
title: "Web API - Document Picture-in-Picture"
date: "2024-03-12T07:10:35Z"
categories:
  - [Web API]

url: web-api-Document_Picture-in-Picture_API
tags:
  - webapi
  - Document Picture-in-Picture

---


原文链接：[https://github.com/taoliujun/blog/issues/82](https://github.com/taoliujun/blog/issues/82)

<!--hexo

---
url: web-api-Document_Picture-in-Picture_API
tags:
  - webapi
  - Document Picture-in-Picture
---

-->

# Document Picture-in-Picture

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API

**Document Picture-in-Picture**画中画用于在窗口中再开一个悬浮的窗口，视频悬浮在右下角就是典型的画中画，它有几点特性：

-   不同于frame，它始终悬浮在最上层。
-   随着主窗口关闭而自动销毁。
-   没有导航特性。
-   和主窗口没有任何干扰。

## 接口

### DocumentPictureInPicture

它包含了`window`属性，和`requestWindow()`方法。

### DocumentPictureInPictureEvent

相关事件。

## 方法和属性

### Window.documentPictureInPicture

返回`DocumentPictureInPicture`接口实例。

## 示例

示例：https://taoliujun.github.io/example/web-api/Document_Picture-in-Picture_API/index.html




