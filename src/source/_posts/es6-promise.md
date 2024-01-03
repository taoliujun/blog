---
title: "整理ES6：Promise的忽略点和几个方法的区别"
date: "2023-07-06T06:21:12Z"
categories:
  - [JavaScript]

url: es6-promise
tags:
  - es6
  - javascript

---


原文链接：[https://github.com/taoliujun/blog/issues/2](https://github.com/taoliujun/blog/issues/2)

<!--hexo
---
url: es6-promise
tags:
  - es6
  - javascript
---
-->

**Promise**是业务开发中使用率最高的ES6方法了，但日常容易忽略几个点，以及记不得它几个方法的区别，现记录。

## 容易忽略的点

* `catch`是`then`的语法糖，但是`catch`可以捕获`then`中的异常，而`then`的第二个回调函数不行。
* 如果没有使用`catch`捕获错误，那么Promise的错误不会传递到外层，即使外层有`try...catch`也捕获不到。
* 因为`catch`捕获了`rejected`且返回新的实例，所以在`all`等方法中，p1实现了`catch`方法，则p1的`rejected`不会触发p的`catch`。

## 几个方法的区别

| 方法 | resolved的前提 | rejected的前提 | 说明 |
| --- | ------------- | ------------- | --- |
| all | 全部resolved | 任一rejected | - |
| race | 任一resolved | 任一rejected | 任一率先改变的状态，传递给p |
| allSettled | 全部改变 | - | 状态全部改变，传递给p。格式为: <br /> `{status: 'fulfilled', value: value}` <br/> 或者 <br/> `{status: 'rejected', reason: reason}` |
| any | 任一resolved | 全部rejected | 传递给`catch`的是一个`AggregateError`实例 |


<!--hexo-->

# AggregateError

AggregateError封装了Error数组，它的结构是：

> AggregateError(errors[, message])

`AggregateError()`构造函数可以接受两个参数。

* errors：数组，它的每个成员都是一个错误对象。该参数是必须的。
* message：字符串，表示 AggregateError 抛出时的提示信息。该参数是可选的。

