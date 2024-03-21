---
title: "Web Api - Intersection Observer"
date: "2024-03-21T07:56:16Z"
categories:
  - [Web API]

url: web-api-Intersection_Observer_API
tags:
  - webapi
  - Intersection Observer

---


原文链接：[https://github.com/taoliujun/blog/issues/92](https://github.com/taoliujun/blog/issues/92)

<!--hexo

---
url: web-api-Intersection_Observer_API
tags:
  - webapi
  - Intersection Observer
---

-->

# Intersection Observer

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

**Intersection Observer**用于检测目标元素与祖先元素或顶级文档的视口相交情况的变化。主要用于：

-   图片懒加载。
-   无限滚动。
-   元素可见度埋点。

## 接口

### IntersectionObserver

相交观察器接口，实例化的时候接受一个回调函数，和一个配置项。

> 观察是异步的，所以回调函数执行时获取的相交信息，不是实时的。

回调函数包含了两个入参：

-   entries，`IntersectionObserverEntry`接口集合。
-   observer，本实例。
-   配置项包含属性：

-   root，必须是被观察元素的祖先元素，或`null`表示为顶级文档。被观察元素将与该元素相交。
-   rootMargin，计算交叉时偏移。默认为`0 0 0 0`。
-   threshold，相交比例阈值，0-1，表示相交比例达到多少时会触发回调函数，默认为`0`。

本接口实例返回了一系列属性，如`root`、`rootMargin`等，意义同入参配置项。还返回了一系列方法如下：

-   observe，加入一个被观察元素。
-   unobserve，移除一个被观察元素。
-   disconnect，停止观察。
-   takeRecords，返回被观察者集合的相交信息。

### IntersectionObserverEntry

某一时刻的相交信息，包含了一系列属性：

-   boundingClientRect，被观察者的边界信息。
-   intersectionRect，相交区域。
-   intersectionRatio，相交比例。
-   isIntersecting，是否相交。
-   rootBounds，根元素的边界信息。
-   target，被观察者元素。
-   time，交叉触发时间差。

## 属性和方法

//

## 事件

//

## 示例

示例：https://taoliujun.github.io/example/web-api/Intersection_Observer_API/index.html

1. 在高度400的父观察元素中，放3个高度300的被观察元素，触发阈值是`[0,1]`，表示被观察者的相交区域比例在0或1发生变化的时候，都会触发回到函数，初始化日志：

![image](https://github.com/taoliujun/blog/assets/5689134/7c93addb-c0b1-4705-873d-fcd150550e22)

元素1全部可见，元素2是0.33的区域可见，元素3则完全不可见。

1. 滚动一点，元素1触发了1阈值。

![image](https://github.com/taoliujun/blog/assets/5689134/791e2220-8837-4784-9139-094b9d6db4eb)

3. 再滚动一点，元素1没有触发0阈值，所以日志中没有它；元素2触发了1阈值；元素3触发了0阈值。

![image](https://github.com/taoliujun/blog/assets/5689134/28587ac6-29d7-4693-90fb-844d3b4f4239)




