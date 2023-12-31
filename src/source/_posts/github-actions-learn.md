---
title: "2. GitHub Actions - Learn GitHub Actions"
date: "2023-07-06T06:29:53Z"
categories:
  - [工程化]

url: github-actions-learn
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/6](https://github.com/taoliujun/blog/issues/6)

<!--hexo
---
url: github-actions-learn
tags:
  - github actions
---
-->

官方文档：https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions

官方文档有点长，阅读了两天，容易让人阅读瞌睡，除了要熟知术语部分，其他部分看一遍知道有这些东西就行了，回头使用的时候翻看官方文档即可。

## 理解GitHub Actions和术语

GitHub Actions就是通过事件触发工作流，在特定机器中执行一连串工作，每个工作中执行若干个步骤的脚本。

使用人类行为来举例，我说：“老婆，你去炒个青椒炒肉丝吧。”

* 口头说话（Events）会触发老婆的工作流（Workflows）：炒青椒肉丝。
* 工作流包含了两个工作（Jobs）：配菜、炒菜。
* 配菜工作包含多个步骤（Steps）：清洗青椒、切青椒丝、清洗猪肉、切猪肉丝。
* 老婆有一个绞肉机（Actions），它可以完成切猪肉丝的工作而不需要关注细节。

它包含了下面几个重要的术语。

### Workflows（工作流）

项目有若干个工作流，它们在不同的事件时机触发。比如，口头说话触发炒青椒肉丝。

工作流还可以互相引用。比如，做一顿晚饭工作流，包含了炒青椒肉丝工作流。

### Events（事件）

Github提供了一系列触发工作流的事件，比如发起了pull request，create issue，push commit。

它还包括两种特殊的事件：

* 手动触发，比如你想执行工作流看看全量eslint检测结果。
* 计划任务，比如你想每月30号看看全量eslint检测结果。

### Jobs（工作）

Workflows由多个Jobs组成。

每个Job运行在**同一机器上**，执行很多步骤的脚本，脚本可以是自定义的shell（比如自己切肉丝，要关注细节：使用什么刀，每个肉丝有多细），也可以是封装好的Actions（比如绞肉机）。

**步骤按顺序执行**，可以共享数据，比如切青椒的步骤，可以读取到青椒清洗的农药残留数据。

**工作还可以依赖**，默认情况下，工作并行执行，但有些场景工作是依赖的，比如炒菜工作，要依赖于配菜工作的完成。

### Actions（脚本动作封装）

顾名思义，就是将通用的动作封装起来，方便整个宇宙的程序员去使用。比如绞肉机就是将切肉丝的动作封装了起来。

可以在Github Marketplace中找到和分享Actions.

### Runners（运行的机器）

工作流不能凭空执行，它也是运行在机器上的，它可以是虚拟机、docker容器。Github提供了 Ubuntu Linux、Microsoft Windows、MacOS这几种机器来执行工作流，注意一个限制：**一个机器同时只能执行一个Job**。

如果官方的机器不能满足你，也可以自动自己的机器来跑工作流，后续会讲到。

## 使用Actions

上面说到Actions是脚本的封装，它可以是社区市场中的Actions，也可以是自定义Actions，甚至是一个Docker镜像。

### Marketplace方式

Github提供了界面操作，让我们可以方便的在工作流中维护Actions，只要我们在浏览器中编辑yml文件，右侧就出现了Actions市场，可以点开某个Actions，查看它的详细配置。

![](https://cdn.jsdelivr.net/gh/taoliujun/static/blog/202306281126235.png)
​
![](https://cdn.jsdelivr.net/gh/taoliujun/static/blog/202306281127958.png)

对照着Actions的文档，我在Workflow中插入node。现在，我的配置文件长这样：

```yaml
name: lint
on: [push]
jobs:
    eslint:
        runs-on: ubuntu-latest
        steps:
            - name: Check out repository code
              uses: actions/checkout@v3
            - name: use node
              uses: actions/setup-node@v3.3.0
              with:
                  node-version: latest
            - run: node -v
```

然后，查看执行结果。
​
![](https://cdn.jsdelivr.net/gh/taoliujun/static/blog/202306281127692.png)

### 自己的Actions

还可以在自己的仓库里添加Actions，这里就贴官方原例子了。

```shell
|-- root (repository)
|   |__ .github
|       └── workflows
|           └── my-first-workflow.yml
|       └── actions
|           |__ hello-world-action
|               └── action.yml
```

Example workflow file:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # This step checks out a copy of your repository.
      - uses: actions/checkout@v3
      # This step references the directory that contains the action.
      - uses: ./.github/actions/hello-world-action
```

### 公共的Actions

```yaml
uses: actions/setup-node@v3
```

使用其他Github仓库的Actions就是如此简单，我们常使用的actions/***，其实也属于公共仓库，它们是由官方维护的一组Actions，比较稳定。点击此处可以看到官方的Actions。

### Docker镜像

如果Runners和开源Actions都不能满足你，可以搞docker来执行Workflows。

因本人的docker水平属于“哇，我能启动docker，我真厉害”，就不展开讲了。

### 不同版本的Actions

Actions本质上是仓库里的文件，它会有版本区分，我们有好几种方法使用它：

```yaml
# 使用tag
uses: actions/javascript-action@v1.0.1
# 使用commitID
uses: actions/javascript-action@172239021f7ba04fe7327647b213799853a9eb89
# 使用branch
uses: actions/javascript-action@main
```

## 基本特性

这部分文档看的云里雾里的，讲了一些如何使用变量，如何在Jobs里共享数据，不知道这些内容出现在这里的目的是什么，略过。

## 表达式

支持在配置中使用表达式，我简单的记录了下，实际使用需要参照官方文档，它包含了以下。

### 变量
支持`boolean`，`null`，`number`，`string` 类型。如下：

```yaml
env:
  myNull: ${{ null }}
  myBoolean: ${{ false }}
  myIntegerNumber: ${{ 711 }}
  myString: Mona the Octocat
  myStringInBraces: ${{ 'It''s open source!' }}
```

### 操作符

一些如值比较、逻辑与、逻辑或的操作，不一一列举了。

注意不是强类型的比较，有一些值转换的逻辑。

### 内置方法

提供了一些内置方法辅助表达式，比如 `contains` 判断是否包含某个字符，不一一列举了。

### 状态处理

Jobs的每个步骤会按顺序执行，我们可以在某个步骤中加入对“已经执行的步骤”的状态判断，来决定是否要执行当前步骤。比如，只有青椒清洗步骤成功了，才执行青椒切丝步骤。举例：

```yaml
steps:
  ...
  # 前面的步骤都执行成功了，再执行该步骤
  - name: The job has succeeded
    if: ${{ success() }}
```

它还有以下几种状态结果：

* **always**，只要执行了
* **success**，执行成功了
* **cancelled**，执行取消了
* **failure**，执行失败了

## 上下文（重要）

上下文指工作流运行中可以访问的属性，你可以在**表达式中**访问上下文，比如访问当前仓库的地址`github.repositoryUrl`。它是**job串起来的重要保障**。

它提供了一组模块的上下文：github、env、job、steps、runner、needs等等。

如下演示了一个简单的上下文访问：

```yaml
name: CI
on: push
jobs:
  prod-check:
    if: ${{ github.ref == 'refs/heads/main' }}
    runs-on: ubuntu-latest
    steps:
      - run: echo "hello ${{ github.actor }}, branch is $GITHUB_REF"
```

重要点：

* 在不同的节点，上下文的可访问性有所不同，文档贴出了表格，这在使用的时候要注意。
* env由内往外覆盖

## 环境变量

还可以在Workflows、Jobs、Steps中设置和访问环境变量。

```yaml
name: lint
on: [push]
env:
    YOUR_NAME: wang
jobs:
    eslint:
        runs-on: ubuntu-latest
        env:
            YOUR_SEX: boy
        steps:
            - name: test
              env:
                  YOUR_AGE: 18
              run: echo "Hello, ${{ env.YOUR_NAME }}, your sex is $YOUR_SEX, your age is $YOUR_AGE"
```

也提供一系列系统环境变量供访问，注意避开同名。

## 收费和限制

略




