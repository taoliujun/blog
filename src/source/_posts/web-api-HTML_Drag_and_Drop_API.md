---
title: "Web API - HTML Drag And Drop"
date: "2024-03-20T08:26:00Z"
categories:
  - [Web API]

url: web-api-HTML_Drag_and_Drop_API
tags:
  - webapi
  - Drag Drop

---


原文链接：[https://github.com/taoliujun/blog/issues/91](https://github.com/taoliujun/blog/issues/91)

<!--hexo

---
url: web-api-HTML_Drag_and_Drop_API
tags:
  - webapi
  - Drag Drop
---

-->

# HTML Drag And Drop

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

**HTML Drag And Drop**允许在浏览器中拖放元素。

**为方便描述，假设可拖动的元素为A，可被放置的元素是B。**

## 接口

### DataTransfer

拖放过程的数据对象接口，由`Event.dataTransfer`暴露，它有如下属性：

#### dropEffect

拖放过程中，在B上给用户的反馈，通常在`dragenter`事件中设置该属性，有几个值：

-   copy，生成A副本，通常的反馈表现是将光标变成一个`+`的标志。
-   move，移动A，通常的反馈表现是将光标变成一个`箭头`的标志。
-   link，建立A的链接，通常的反馈表现是将光标变成一个`左镜像箭头`的标志。
-   none，禁止拖放，通常的反馈表现是将源项变成灰色。

> 除了`none`会禁止放置行为，其他值仅仅会产生视觉表现，实际的放置行为由`drop`事件的回调函数里决定。

#### effectAllowed

拖放过程中，在A上给用户的反馈，通常在`dragstart`事件中设置该属性，有几个值：

-   none，不允许拖放。
-   copy，生成A副本。
-   link，可以在新地方建立与A的链接。
-   move，可移动A。
-   copyLink，允许 copy 或者 link 操作。
-   copyMove，允许 copy 或者 move 操作。
-   linkMove，允许 link 或者 move 操作。
-   all，允许所有的操作。

#### files

拖放的文件列表，返回`File[]`，此功能可用于将文件拖动到浏览器。

#### items

拖放操作中，数据传输项的列表，返回`DataTransferItemList`。

#### types

拖放的数据格式，和`items`的数据顺序是一一对应的。

还包括了一些方法：

#### setData/getData/clearData

设置、读取、清除拖拽的数据。

#### setDragImage

设置拖动中跟随鼠标的图片，默认是A的半透明图像。

### DataTransferItem

一个拖动项接口。

### DataTransferItemList

拖动项集合接口。

### DragEvent

拖动事件接口。

## 属性和方法

//

## 事件

元素拖放过程中有一系列事件，为方便描述，假设可拖动的元素为A，可被放置的元素是B。

### dragstart

A的拖动行为开始。

### drag

A被拖动中，它会被连续触发。

### dragenter

A被拖动进了B。

### dragover

A被拖动中，在B的区域内，它会被连续触发。

### dragleave

A被拖动离开了B。

### drop

A放在了B中。

### dragend

A的拖动行为停止，比如放开了鼠标。

## 示例

示例：https://taoliujun.github.io/example/web-api/HTML_Drag_and_Drop_API/index.html




