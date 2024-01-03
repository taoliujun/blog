---
title: "整理ES6：运算符"
date: "2023-07-06T06:35:25Z"
categories:
  - [JavaScript]

url: es6-operator
tags:
  - es6
  - javascript

---


原文链接：[https://github.com/taoliujun/blog/issues/16](https://github.com/taoliujun/blog/issues/16)

<!--hexo
---
url: es6-operator
tags:
  - es6
  - javascript
---
-->

## 链判断运算符`?.`

非常方便的代替了传统的属性是否存在的判断，它有两个注意点：

* 左侧的对象是否为`null`或`undefined`，如果不是，则继续运算。
* 如果是的，就不再往下运算，而是返回`undefined`。

常见用法如下：

* obj?.prop // 对象属性是否存在
* obj?.[expr] // 同上
* func?.(...args) // 函数或对象方法是否存在

## Null 判断运算符`??`

如果运算结果为`null`或`undefined`，则返回右侧的值，否则返回左侧的值。

```typescript
// 老写法，如果左侧的boolean值为falsy，都会返回右侧的值
const headerText = response.settings.headerText || 'Hello, world!';
// ??写法，只有左侧的值为null或undefined时，才会返回右侧的值
const headerText = response.settings.headerText ?? 'Hello, world!';
```



