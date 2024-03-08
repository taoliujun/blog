---
title: "Web API - Clipboard"
date: "2024-03-08T01:51:33Z"
categories:
  - [JavaScript]

url: web-api-Clipboard_API
tags:
  - webapi
  - Clipboard

---


原文链接：[https://github.com/taoliujun/blog/issues/72](https://github.com/taoliujun/blog/issues/72)

<!--hexo

---
url: web-api-Clipboard_API
tags:
  - webapi
  - Clipboard
---

-->

# Clipboard

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API

**Clipboard**提供了对系统剪切板的读取、写入方法。

> 不要再使用`document.execCommand()`了。

## 接口

### Clipboard

使用`Navigator.cliboard`可得到`Clipboard`接口实例，提供了`read`和`write`方法。另外，`readText`和`writeText`方法是一对读取写入文本信息的快捷方法。

### ClipboardItem

剪切板数据对象，包含了数据类型`type`（如`image/png`）和数据流`blob`。

## 方法和属性

略，见示例。

## 示例

示例：https://taoliujun.github.io/example/web-api/Clipboard_API/index.html

1. 复制输入框的文本到系统剪切板中、或从系统剪切板中读取：

![image](https://github.com/taoliujun/blog/assets/5689134/007c9e39-b66b-4910-ad55-e4391c4088bd)

2. 复制canvas的图像数据到剪切板、或从剪切板中读取：

![image](https://github.com/taoliujun/blog/assets/5689134/852608b5-dc86-4c24-9748-55004fee34ce)




