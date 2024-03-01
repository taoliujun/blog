---
title: "Web API - Background Tasks"
date: "2024-03-01T03:56:11Z"
categories:
  - [JavaScript]

url: web-api-Background_Tasks_API
tags:
  - webapi
  - Background Tasks

---


原文链接：[https://github.com/taoliujun/blog/issues/55](https://github.com/taoliujun/blog/issues/55)

<!--hexo
---
url: web-api-Background_Tasks_API
tags:
  - webapi
  - Background Tasks
---
-->

# Background Task

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API

**Background Tasks**用于在空闲时间执行队列任务，从而**不阻塞事件处理和屏幕更新**。

我们遇到的大部分浏览器卡顿场景是因为代码执行时间太长，阻塞了用户交互、DOM绘制。

在以前，可以将耗时任务分为若干份，每一份执行N次任务，每M毫秒执行一份代码，直至所有任务被执行完成。虽然减轻了卡顿率，但存在以下问题：

-   要主观判断N次任务的耗时不超过10ms，在一帧中留下充足的时间去处理交互、DOM绘制等。
-   不超过10ms的N次任务，在每一帧的瞬时性能中，实际耗时是不一样的。所以如何定义N的值，也是主观而不科学的。
-   在每一帧中，任务仍然会耗时过长而阻塞交互、绘制。

现在，Background Task提供了方法，获取到当前留下了多少空闲时间，在这段时间里可以尽量的执行若干次任务。但仍需注意，只运行那些**单次耗时时间很短的任务**。

> “单次耗时时间很短”是什么意思？在不同的场景中，这个时间是可以浮动的。
>
> -   在用户点击按钮以查看最新文本信息的场景中，这个时间可以定义为100ms，因为用户在此时间后得到反馈，是不觉得卡顿的。
> -   在用户快速输入文本以反馈到屏幕上、或滚动订单列表的场景中，这个时间要定义为10ms，因为用户在快速的操作中得不到瞬间反馈就容易感受到卡顿。

## 方法

### requestIdleCallback

在空闲时间执行回调。

## 示例

示例：https://taoliujun.github.io/example/web-apis/Background_Tasks_API/index.html

1. 点击几次"add task"按钮，此时没有任务在运行，发现每一秒都流畅打印出任务量。

![image](https://github.com/taoliujun/blog/assets/5689134/342d899c-45cf-4f61-a529-8846282f2028)

2. 点击"run all tasks"按钮，发现一次跑完所有任务，耗时几千毫秒，此过程中因为DOM绘制被阻塞，打印也卡住了。

![image](https://github.com/taoliujun/blog/assets/5689134/485c6005-7543-42ab-9096-c5b4fcc9681b)

3. 点击"run tasks"按钮，让其循环在空闲时间中跑完所有任务，发现每次执行很少个任务，耗时在几十毫秒，不会阻塞DOM绘制，打印毫无卡顿。

![image](https://github.com/taoliujun/blog/assets/5689134/3b67b0ff-df48-45e9-8c34-6d7327bea1c9)




