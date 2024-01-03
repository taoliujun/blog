---
title: "5. GitHub Actions - Using jobs"
date: "2023-07-06T06:31:40Z"
categories:
  - [工程化]

url: github-actions-jobs
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/9](https://github.com/taoliujun/blog/issues/9)

<!--hexo
---
url: github-actions-jobs
tags:
  - github actions
---
-->

官方文档：https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow

## 使用jobs

* jobs组成workflow，jobs默认并行执行，使用needs管理依赖执行。
* job id命名要唯一，由字母、数字、-、_组成。

## 使用runner

可以使用github提供的机器，也可以自建机器，没啥其他重要的。

## 执行条件

执行if表达式的结果，决定是否执行本job。举例：

```yaml
name: example-workflow
on: [push]
jobs:
  production-deploy:
    if: github.repository == 'octo-org/octo-repo-prod'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '14'
      - run: npm install -g bats
```

## 矩阵
晦涩的词语，理解为遍历变量创建重复执行的job，如下，该job将执行6次，在两个runner上分别执行3种node版本的job。

```yaml
jobs:
  example_matrix:
    strategy:
      matrix:
        os: [ubuntu-22.04, ubuntu-20.04]
        version: [10, 12, 14]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.version }}
```

也可以使用上下文创建matrix变量。

matrix还支持自身简单的覆盖扩展，参考文档即可。

## 并发策略

同时只能运行一个符合策略的job或workflow，并决定是否终止同组的job或workflow。

## 环境

无

## 容器

暂时用不到，无

## 默认值

可以在workflow和job级别分别设置默认值，目前支持设置`shell`、`working-directory`。



