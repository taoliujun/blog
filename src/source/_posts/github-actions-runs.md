---
title: "6. GitHub Actions - Managing workflow runs"
date: "2023-07-06T06:32:01Z"
categories:
  - [工程化]

url: github-actions-runs
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/10](https://github.com/taoliujun/blog/issues/10)

<!--hexo
---
url: github-actions-runs
tags:
  - github actions
---
-->

官方文档：https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow

## 手动执行

设置`event`包含`workflow_dispatch`，可以手动触发，使用Github CLI、Browser都可以，文档中呈现了一个流程图示例。

## 重复执行

无

## 取消执行

无

## 审批执行

对于pull request，可以设置审批执行以防止浪费actions资源。

## 审查部署

无

## 开关workflow

无

## 跳过workflow

在commit message中加入关键词可以跳过workflow，只对push、pull_request事件有效。关键词有：

* [skip ci]
* [ci skip]
* [no ci]
* [skip actions]
* [actions skip]

也可以在message后空两行，然后加入关键词：

* skip-checks:true
* skip-checks: true

## 删除workflow

无

## 下载workflow归档

可以下载90天内的workflow归档，操作参考文档。



