---
title: "Web API - File"
date: "2024-03-13T02:32:04Z"
categories:
  - [Web API]

url: web-api-File_API
tags:
  - webapi
  - File

---


原文链接：[https://github.com/taoliujun/blog/issues/85](https://github.com/taoliujun/blog/issues/85)

<!--hexo

---
url: web-api-File_API
tags:
  - webapi
  - File
---

-->

# File

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/File_API

**File**用于读取用户通过`<input type="file"/>`选择、或`DataTransfer`拖拽的文件。

## 接口

### Blob

文件的原始数据接口，可以用`text`、`stream`方法处理成文本或二进制流。

### File

文件接口。包含文件信息`size`、`type`等，还包含了`Blob`原始数据。

### FileList

File list。

### FileReader

读取文件的接口，包含`readAsDataURL`、`readAsText`等方法来读取文件，通过`errer`、`load`、`progress`等事件监听读取结果，结果中包含了`result`、`reayState`等信息。

### FileReaderSync

FileReader的同步版本。

## 属性和方法

### URL.createObjectURL

将`File`或`Blob`转成url字符串。

### URL.revokeObjectURL

将url字符串转成`Blob`对象。

## 示例

示例：https://taoliujun.github.io/example/web-api/File_API/index.html

1. 读取文件，并渲染到图片元素中。

![image](https://github.com/taoliujun/blog/assets/5689134/0f794817-4be3-4500-b9dd-b626043bc180)




