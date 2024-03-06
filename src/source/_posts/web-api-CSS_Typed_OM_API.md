---
title: "Web API - CSS Typed Object Model"
date: "2024-03-06T08:54:11Z"
categories:
  - [JavaScript]

url: web-api-CSS_Typed_OM_API
tags:
  - webapi
  - CSS Typed OM

---


原文链接：[https://github.com/taoliujun/blog/issues/69](https://github.com/taoliujun/blog/issues/69)

<!--hexo

---
url: web-api-CSS_Typed_OM_API
tags:
  - webapi
  - CSS Typed OM
---

-->

# CSS Typed OM

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API

**CSS Typed OM**全称`CSS Typed Object Model`，提供了一系列访问和操作CSS值的方法。

在以往，使用`HTMLElement.style`管理元素的样式，它只是一个`string`类型，管理很笨拙，可读性也差。而本API将CSS值解析为可读性很高的对象，据此可以科学的管理它。

> 和`HTMLElement.style`相比，本API更有可读性，性能更高。

## 接口

有公用类型`CSSStyleValue`和若干特殊类型如`CSSImageValue`、`CSSKeywordValue`等组成。

### CSSStyleValue

它是所有CSS值类型的公用类型，提供了`parse`方法将一个字符串解析成样式对象，例：

```javascript
// 返回 CSSStyleValue 类型
CSSStyleValue.parse('color', '#f00');
// 返回 CSSTransformValue 类型
CSSStyleValue.parse('transform', 'translate(30px, 20px) rotate(45deg)');
```

### CSSKeywordValue

CSS保留关键字类型如`initial`，例：

```javascript
// 返回 CSSKeywordValue {value: 'normal'} 类型，因为normal是保留关键字。
$0.computedStyleMap().get('font-style');
```

### 其他类型见MDN

### StylePropertyMapReadOnly

提供`get`、`getAll`等方法读取样式。

### StylePropertyMap

继承于`StylePropertyMapReadOnly`，提供`append`、`set`等方法操作样式，如：

```javascript
// 将元素的文本颜色设置为红色
$0.attributeStyleMap.set('color', 'red');
```

## 方法和属性

### computedStyleMap

`HTMLelement.computedStyleMap()`返回`StylePropertyMapReadOnly`类型。

### attributeStyleMap

`HTMLElement.attributeStyleMap`返回`StylePropertyMap`类型。

## 示例

示例：https://taoliujun.github.io/example/web-api/CSS_Typed_OM_API/index.html

1. 在例子中，打印出元素所有的样式，或打印出指定的样式：

![image](https://github.com/taoliujun/blog/assets/5689134/50ce9bcd-62e4-42de-9368-81c6017b6476)

2. 改变元素的颜色样式：

![image](https://github.com/taoliujun/blog/assets/5689134/7893da8e-63f7-4810-8a93-9ad5cc36cb22)




