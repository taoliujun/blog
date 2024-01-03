---
title: "7. GitHub Actions - 在pull request中执行eslint检测的工作流例子"
date: "2023-12-29T03:56:49Z"
categories:
  - [工程化]

url: github-actions-sample-eslint-in-pull-request
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/36](https://github.com/taoliujun/blog/issues/36)

<!--hexo
---
url: github-actions-sample-eslint-in-pull-request
tags:
  - github actions
---
-->

一个在pull request发起的时候执行eslint检测的workflow，[点此查看完整代码](https://github.com/taoliujun/npm-packages/blob/master/.github/workflows/check-pull-request.yml)，它实现的功能如下：

- 在pull request创建、更新的时候执行。
- 先回复一个评论，告诉用户正在运行。
- 初始化仓库，并安装依赖，产生依赖缓存。
- 运行eslint增量检查。
- 运行typescript检查。
- 运行jest检查。
- 更新之前的评论，回复检查的结果。

运行截图：

![Alt text](https://github.com/taoliujun/blog/assets/5689134/09c86bc1-ada1-41c3-9f8f-7e6c46f8204e)

为避免歧义，涉及到github action的术语都是英文的。术语介绍如下：

* workflow，工作流，可以理解为yml文件。
* jobs，工作，一个workflow可以包含多个job，并行执行。
* steps，作业，一个job可以包含多个step，串行执行。
* action，操作，作业中具体的执行。

## 步骤

- [初始化workflow](https://github.com/taoliujun/blog/issues/36#issuecomment-1871790603)
- [reply checking](https://github.com/taoliujun/blog/issues/36#issuecomment-1871806576)
- [./.github/actions/unique-comment](https://github.com/taoliujun/blog/issues/36#issuecomment-1871818126)
- [init](https://github.com/taoliujun/blog/issues/36#issuecomment-1871862632)
- [eslint](https://github.com/taoliujun/blog/issues/36#issuecomment-1871862779)
- [typescript](https://github.com/taoliujun/blog/issues/36#issuecomment-1871862850)
- [unit test](https://github.com/taoliujun/blog/issues/36#issuecomment-1871863037)
- [reply result](https://github.com/taoliujun/blog/issues/36#issuecomment-1871863117)

<!--hexo-->
# 初始化workflow

在项目中新建文件`.github/workflows/check-pull-request.yml`，内容如下：

```yaml
name: test check pull request
run-name: 'check pull request #${{ github.event.pull_request.number }}'
on:
    pull_request:
        types: [opened, synchronize, reopened]
jobs:
    replyChecking:
        runs-on: ubuntu-latest
        steps:
            - run: echo 'replyChecking'

    init:
        runs-on: ubuntu-latest
        steps:
            - run: echo 'init'

    eslint:
        runs-on: ubuntu-latest
        needs: [init]
        steps:
            - run: echo 'eslint'

    typescript:
        runs-on: ubuntu-latest
        needs: [init]
        steps:
            - run: echo 'typescript'

    unitTest:
        runs-on: ubuntu-latest
        needs: [init]
        steps:
            - run: echo 'unitTest'

    replyResult:
        runs-on: ubuntu-latest
        needs: [replyChecking, eslint, typescript, unitTest]
        steps:
            - run: echo 'replyResult'
```

## name和run-name

给workflow命名为`check pull request`，它会出现在Actions页面的左侧菜单中。运行实例名为`check pull request #44`，出现在右侧的运行列表中。如图：

![](https://github.com/taoliujun/blog/assets/5689134/c1371ff2-8fc3-4e5b-8b60-3c572419938b)

`run-name`中的`${{ github.event.pull_request.number }}`是workflow的上下文，这里读取了上下文中的pr编号。

## on

`on`指定了workflow的触发条件，这里配置了在pr创建、同步、重新打开的时候，触发该workflow。

## jobs

按照设想，需要定义几个job，分别是：

-   replyChecking：回复用户正在检查中
-   init：初始化仓库，缓存依赖项
-   eslint：运行eslint检查
-   typescript：运行typescript检查
-   unitTest：运行单元测试
-   replyResult：回复用户检查结果

`jobs`是并行运行的，聪明如你肯定发现了，eslint、typescript、unitTest这三个job会涉及到安装npm依赖，所以它们最好在init后执行，确保依赖已经缓存了。

其次，replyResult肯定要拿到eslint等job的结果才能执行，所以使用了`needs`管理它们的执行依赖关系。

### runs-on

每个job都运行在独立的容器中，github官方提供了windows、macos、linux多种容器，这里使用了ubuntu容器。

## 测试

发起一个pr，看到Actions页面出现了新的运行实例，点击进去，可以看到各个job的运行情况和依赖关系：

![](https://github.com/taoliujun/blog/assets/5689134/09c86bc1-ada1-41c3-9f8f-7e6c46f8204e)


