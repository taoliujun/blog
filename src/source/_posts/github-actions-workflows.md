---
title: "4. GitHub Actions - Using workflows"
date: "2023-07-06T06:31:08Z"
categories:
  - [工程化]

url: github-actions-workflows
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/8](https://github.com/taoliujun/blog/issues/8)

<!--hexo
---
url: github-actions-workflows
tags:
  - github actions
---
-->

官方文档：https://docs.github.com/en/actions/using-workflows/about-workflows

原文很长，但随着对Github Actions的了解，笔记也会越来越短。

## 介绍

更详细介绍了workflow的构成，没啥特别重要点。

## 触发

再次复习下触发的几种情况：github、计划任务、手动。

### Branches过滤

可以通过 branches 、branches-ignore 过滤或排除分支，支持glob patterns。还可以在 branches 前面用!修饰为“非”。比如：

```yaml
on:
  pull_request:
    branches:    
      - 'releases/**'
      - '!releases/**-alpha'
```

### Tags过滤

对于tags 的过滤处理和branches是一致的，只是修改了名字为tags、tags-ignore。

### Types过滤

可以理解为事件的具体行为，比如 issue_commot事件的created行为。

### Paths过滤

文件路径过滤也是基本功能了，使用paths、paths-ignore处理，举例：

```yaml
on:
  push:
    paths:
      - '**.js
```

注意，一些过滤场景并不允许 a和a-ignore一起使用，需要注意的。

### 其他

* 还可以对input进行参数过滤，以满足更丰富的触发条件配置。
* 对github的属性，如pull request发起人的名字进行过滤。

## 事件

列举了常见的30几种事件，大部分事件包含多种行为。

## 语法

涵盖了workflow的大部分配置项。

## 命令行

actions如何和bash交换变量，使用actions/toolkit可以简单做到。

## 复用

注意复用的上下文

## 缓存

可以缓存npm的依赖以节省install的时间，注意缓存的跨分支适用策略。



