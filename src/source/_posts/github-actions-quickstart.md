---
title: "1. GitHub Actions - Quickstart"
date: "2023-07-06T06:29:06Z"
categories:
  - [工程化]

url: github-actions-quickstart
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/5](https://github.com/taoliujun/blog/issues/5)

<!--hexo
---
url: github-actions-quickstart
tags:
  - github actions
---
-->

官方文档：https://docs.github.com/en/actions/quickstart

本文里，因为还没有讲术语的意思，所以用中文描述了基本的执行过程，后续的文章里会用原术语来表达，以防理解不一。

文档说，只要有仓库，就可以使用Actions。

依葫芦画瓢，在本地创建 `.github/workflows` 目录，在目录里创建任意文件，以.yml结尾，我创建了 `lint.yml`：

```yaml
name: lint
on: [push]
jobs:
    eslint:
        runs-on: ubuntu-latest
        steps:
            - run: echo "The job was automatically triggered by a ${{ github.event_name }} event."
            - name: Check out repository code
              uses: actions/checkout@v3
            - name: List files in the repository
              run: ls ${{ github.workspace }}
            - run: echo "  This job's status is ${{ job.status }}."
```

配置文件有很多术语在后面的笔记中讲解，对于上面的配置简单的解释下：

```yaml
# 这个工作流的名字: lint
name: lint
# 在分支push的时候触发
on: [push]
# 工作列表，例子里只做一个eslint工作
jobs:
    # 这一步工作名叫做eslint
    eslint:
        # 代码执行在ubuntu-latest的宿主里，注：ubuntu-latest是github提供的免费的宿主。
        runs-on: ubuntu-latest
        # 执行哪些代码
        steps:
            # 执行一个普通的shell脚本，就是 echo '巴拉巴拉巴拉巴拉一段话'，这段话里的${{github.event_name}}
            # 是一个变量，这个变量由actions上下文提供，望文生义，event_name是事件名称的意思
            - run: echo "  The job was automatically triggered by a ${{ github.event_name }} event."
            # 为这一步脚本定一个名字，叫做 巴拉巴拉
            - name: Check out repository code
              # 我们使用别人提供的封装好的脚本，这里的意思是使用官方提供的 actions/checkout 的脚本的v3版本
              uses: actions/checkout@v3
            # 又定义一个名字，叫做 巴拉巴拉
            - name: List files in the repository
              # 再一次运行自定义的脚本，列出目录结构，这儿又使用了一个变量
              run: ls ${{ github.workspace }}
            # 最后再执行一个自定义脚本，输出一段话，包含了当前工作的执行状态
            - run: echo "  This job's status is ${{ job.status }}."
```

而后，将代码推送到github仓库，我们进入仓库页面，点击 Actions 面板，看到 workflows记录，进入详情看到类似面板。

![](https://cdn.jsdelivr.net/gh/taoliujun/static/blog/202306281119773.png)

这个面板展示了lint.yml这个工作流的执行状态，它列出所有的工作及其状态以及执行时间。

![](https://cdn.jsdelivr.net/gh/taoliujun/static/blog/202306281120264.png)

进入工作流的执行详情，可以看到每个工作的每一步脚本的详细执行过程和输出结果，就不一一表述了，后续会讲到。



