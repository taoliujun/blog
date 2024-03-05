---
title: "Web API - CSS Properties and Values"
date: "2024-03-05T10:04:49Z"
categories:
  - [JavaScript]

url: web-api-CSS_Properties_and_Values_API
tags:
  - webapi
  - CSS Properties and Values

---


原文链接：[https://github.com/taoliujun/blog/issues/67](https://github.com/taoliujun/blog/issues/67)

<!--hexo

---
url: web-api-CSS_Properties_and_Values_API
tags:
  - webapi
  - CSS Properties and Values
---

-->

# CSS Properties and Values

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API

**CSS Properties and Values**用于为CSS扩展属性，

> 和`CSS variables`有类似点，但后者只是一个变量，没有CSS属性之特性：比如继承特性。

## 接口

### CSSPropertyRule

属性和值的定义描述。

> syntax选项标识了值的预期语法，如`<color>`。

## 方法

### registerProperty

创建自定义css属性。

## 示例

示例：https://taoliujun.github.io/example/web-api/CSS_Properties_and_Values_API/index.html

1. 两个Div使用了一样的样式，但`registerProperty`注册了**非继承**的属性，所以`.parent1 .item1`并未继承`.parent1`中设置的属性值，而使用了默认值。

![image](https://github.com/taoliujun/blog/assets/5689134/9caf3326-17d2-4390-8484-5ec5e2ea835e)




