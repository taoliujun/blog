
---
title: "7. GitHub Actions - 在pull request中执行eslint检测的工作流例子"
date: "2023-12-29T03:56:49Z"
categories:
  - [工程化]

url: react-usetransition
tags:
  - react
  - useTransition

---


<!--hexo
---
url: react-usetransition
tags:
  - react
  - useTransition
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