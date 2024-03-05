---
title: "Web API - CSS Custom Highlight"
date: "2024-03-05T02:55:53Z"
categories:
  - [JavaScript]

url: web-api-CSS_Custom_Highlight_API
tags:
  - webapi
  - CSS Custom Highlight

---


原文链接：[https://github.com/taoliujun/blog/issues/63](https://github.com/taoliujun/blog/issues/63)

<!--hexo

---
url: web-api-CSS_Custom_Highlight_API
tags:
  - webapi
  - CSS Custom Highlight
---

-->

# CSS Custom Highlight

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API

**CSS Custom Highlight**为页面上的[Range](https://developer.mozilla.org/en-US/docs/Web/API/Range)对象，创建高亮标识，并结合css伪元素`::highlight`自定义显示。

使用场景有*搜索词高亮*、*多人协作时的文本多色高亮*等。

## 接口

### Highlight

创建高亮对象，并包含若干`Range`对象。例如：

```javascript
const user1Highlight = new Highlight(range1, range2);
```

### HighlightRegistry

为高亮对象注册css标识，即可在css中访问。例如：

```javascript
// javascript
CSS.highlights.set('user-1-highlight', user1Highlight);
```

```css
// css
::highlight(user-1-highlight) {
    background-color: yellow;
    color: black;
}
```

## 示例

示例：https://taoliujun.github.io/example/web-api/CSS_Custom_Highlight_API/index.html

1. 为`Range`区域设置了特殊的样式。

![image](https://github.com/taoliujun/blog/assets/5689134/3362d87f-c006-42b3-8d71-0949e65b7080)




