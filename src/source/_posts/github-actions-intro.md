---
title: "0. GitHub Actions - Intro"
date: "2023-07-06T06:27:24Z"
categories:
  - [工程化]

url: github-actions-intro
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/4](https://github.com/taoliujun/blog/issues/4)

<!--hexo
---
url: github-actions-intro
tags:
  - github actions
---
-->

官方文档：https://docs.github.com/en/actions

之前依葫芦画瓢使用了CI，并未对此做系统的了解，近期通读了一遍Github Actions文档，本系列文章是个人在 https://docs.github.com/en/actions 学习过程的杂乱记录，它是这样的：

* 本文章系列不同于官方文档的中文翻译，只是加入个人理解的学习日记，内容不会完全覆盖。
* 时间背景是 2023年12月份。
* 按照官方文档的顺序做了笔记，但忽略了个人认为不重要的部分。
* 都是经验主义的理解，并且由于本人英文水平有限，会有理解出错的地方。
* 部分理解也未基于代码实际运行结果，纯属经验和猜测。
* 因为文档术语翻译往往词不达意，所以会有很多中英参杂。

## 是什么？

既然你搜索到本文，想必是知道它是干什么的。我概括为：

> GitHub Actions允许你在某些行为（比如push master分支）后，利用特定机器，执行脚本（比如eslint check），并反馈结果形成一个job。job可以串起来，以完成更复杂的自动化操作。

## 和CI的关系

CI/CD是执行自动化工作流的持续发布策略，它存在于gitlab、github、jekins，甚至你在服务器上写了一个简单的计划任务拉取仓库代码后进行打包的脚本，也可以称之为CI。

在github.com上的CI就是GitHub Actions，它提供了一组特定的环境变量、上下文、宿主机器。




