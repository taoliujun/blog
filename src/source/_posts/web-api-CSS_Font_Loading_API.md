---
title: "Web API - CSS Font Loading"
date: "2024-03-05T04:06:50Z"
categories:
  - [JavaScript]

url: web-api-CSS_Font_Loading_API
tags:
  - webapi
  - CSS Font Loading

---


原文链接：[https://github.com/taoliujun/blog/issues/65](https://github.com/taoliujun/blog/issues/65)

<!--hexo

---
url: web-api-CSS_Font_Loading_API
tags:
  - webapi
  - CSS Font Loading
---

-->

# CSS Font Loading

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API

**CSS Font Loading**和css的`@font-face`所作功能一致，在javascript中加载字体可以更精确控制其加载状态，并用在canvas等场景中。

## 接口

### FontFace

创建字体对象。

```javascript
const font1 = new FontFace(
    'f1',
    `url(https://fonts.gstatic.com/s/kodemono/v1/A2BYn5pb0QgtVEPFnlYOnYLweZGZuA.woff2) format('woff2')`,
    {
      weight: '800'
    }
);
font1.load();
document.fonts.add(font1);
```

> 第三个参数描述符和css `@font-face`的属性`font-style`等是一样的作用，用于精确匹配字体源的。


## 示例

示例：https://taoliujun.github.io/example/web-api/CSS_Font_Loading_API/index.html

1. 加载字体，在dom中自动生效，以及在canvas中作图。

![image](https://github.com/taoliujun/blog/assets/5689134/dee25ceb-9ddb-4cf8-9f7f-93382d3211b2)




