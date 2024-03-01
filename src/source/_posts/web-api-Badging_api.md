---
title: "Web API - Badging"
date: "2024-02-28T08:22:00Z"
categories:
  - [JavaScript]

url: web-api-Badging_api
tags:
  - webapi
  - Badging

---


原文链接：[https://github.com/taoliujun/blog/issues/50](https://github.com/taoliujun/blog/issues/50)

<!--hexo
---
url: web-api-Badging_api
tags:
  - webapi
  - Badging
---
-->

# Badging

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Badging_API

**Badging**用于在Web APP的图标上**标记徽章**，常用于通知用户有新消息啦，它有3种状态：


| 状态 | 描述 | 效果 |
| --- | --- | --- |
| nothing | 什么都没有 | ![image](https://github.com/taoliujun/blog/assets/5689134/0410ffdf-fbf3-41aa-b3b5-de0aa2ceb671) |
| flag | 一个圆点 | ![image](https://github.com/taoliujun/blog/assets/5689134/965f2c77-8b85-443f-8f97-da491df88354) |
| integer | 一个数字，最大显示99+ | ![image](https://github.com/taoliujun/blog/assets/5689134/f0333758-125b-40b9-a88b-285346730816) |

## 方法

### setAppBadge

设置徽章。

```javascript
// 设置圆点
navigator.setAppBadge();
// 设置数字
navigator.setAppBadge(12);
// 设置大数字
navigator.setAppBadge(1234);
```

### clearAppBadge

清空徽章。

```javascript
navigator.clearAppBadge();
```

## 示例

示例：https://taoliujun.github.io/example/web-apis/Badging_API/index.html

本示例代码较为简单，直接打开查看源码即可。



