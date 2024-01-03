---
title: "3. GitHub Actions - Examples"
date: "2023-07-06T06:30:34Z"
categories:
  - [工程化]

url: github-actions-examples
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/7](https://github.com/taoliujun/blog/issues/7)

<!--hexo
---
url: github-actions-examples
tags:
  - github actions
---
-->

官方文档：https://docs.github.com/en/actions/examples/using-scripts-to-test-your-code-on-a-runner

官方描述了3个例子，用来检测文件中的broken，我读书少，就依葫芦画瓢写一个eslint检测增量文件的功能，完成以下功能：

* pull_request触发workflow。
* 使用eslint检查pull request的增量文件。
* 在pull request中回复检测结果。

代码见：https://github.com/taoliujun/npm-packages/blob/master/.github/workflows/check-pull-request.yml



