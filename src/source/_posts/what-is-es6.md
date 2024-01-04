---
title: "整理ES6：ES6是什么？"
date: "2023-07-06T06:18:38Z"
categories:
  - [JavaScript]

url: what-is-es6
tags:
  - es6
  - javascript

---


原文链接：[https://github.com/taoliujun/blog/issues/1](https://github.com/taoliujun/blog/issues/1)

<!--hexo
---
url: what-is-es6
tags:
  - es6
  - javascript
---
-->

## 注

本系列文章不是技术教程，只是个人的知识点整理。

## 第一段废话

就在昨晚，我突然冒出了奇怪的心思想要对10年学习工作生涯做一个总结。但今早起来发现无从下手，一是没有优秀的文笔能力，不能科学优雅地整理出重点；二是实在没有牛逼的技术能力，羞于展示于众，这么多年的成长也不过是不断咀嚼大神们的产出。得益于互联网的开源精神和友善的讨论氛围，我这并不天资聪明的脑袋也算是学到了点皮毛能一直工作以温饱无忧。但是说了废话这么多，对写总结仍是没有帮助的，我翻来覆去后打算，不如抓近几年的重点，给某个技术点做一些总结，一来锻炼自己的文笔能力，二来做一次高质量的复习也是能提升自我能力。

## 为什么写ES6？

我从IE6时代开始写JavaScript，到2016年左右迎接真正的成年JS：ES6，接下来是前端爆发时代：CoffeeScript、TypeScript、Webpack、Angular、React、Node、Eslint等百十个技术点或框架层出不穷走向成熟。我和大部分人一样，在有限的精力里不断地消化它们，它们或成为我们工作的一部分，或像IE6一样一去不复返。如上所说，总有一些技术如TypeScript那般坚持了多年之久仍然在坚强的活着，它们如此受欢迎必然有它的闪光点。而ES6正是如此，用稳定优秀的迭代力，现代化的设计理念、牢牢的抓住了各大厂商和开发者的心。

如果看这篇文档的人儿中有一些近几年加入的开发者，我想对大家说，ES6并不是自古就有，它的出生并不一帆风顺，甚至在推出稳定版本后，得到了一些开发者诸如“浏览器都不支持，要你何用”的嘲笑。但得益于polyfill(s)、浏览器厂商、github开源等好多组织的相辅相成，ES6才成为了现在这样。

## ES6到底是什么？

大家或多或少看了ES6的介绍文章，正如每个人心中哈姆雷特是不一样的，我参考总结了一些文章，加上自身的工作经验，对ES6做以下的介绍。

JavaScript在上世纪90年代被提交给标准化组织ECMA，紧接着制定出第一个该语言标准并命名为ECMAScript 1.0，ES便是其简称。JavaScript是该标准的实现之一，被广泛使用，我们可以简单的认为JavaScript就是ECMAScript。

之后该标准不断推出新版本一直到5.1，当要制定6.0标准的时候，发现要加入的语法功能太多了，要不断地推出6.1、6.2，难以规划和命名。于是ECMA组织改变了策略，定于每年6月推出一个新版本并按年份命名，在这一年期间，若干草案得到充分讨论和经过几个草案步骤后加入到新标准中。于是ES 6.0摇身变成ES2015，之后的年份一直推出ES2016、ES2017等。

**虽然从历史上讲，ES6单指ES2015；但大众更容易理解的是，ES6泛指ES2015及以后的新语法功能。**

这些年的互联网文章在特别的介绍ES6的语法功能，用于与ES5进行对比，或许再过一些年，人们不再提起ES6了，那时候的文章会统一讲整个ECMAScript，再有每年6月份单独的讲解ES20xx了吧。

## ES6的相关技术

### polyfill、babel是什么？

ES2015之后每一年会发布新的语法功能，我们在代码中使用新语法和功能，但用户的浏览器、Node客户端大概率不是最新版本，并不支持这些新语法。于是发展出两个方案解决这个问题，一是使用babel将新语法编译为老语法（按浏览器版本覆盖率、指定标准等配置，略过不表），二是使用polyfill用老语法模拟出新功能。有了这两者，我们基本可以放心的写出优雅的新代码，然后由它们编译后供浏览器解析。值的说明的是，新功能那么多，现代开发者不需要去维护polyfill列表了，babel中使用core-js库根据browserrc配置项智能的去引入polyfill了。

### 和TypeScript的关系？

TypeScript是对ES的类型补充，它存在一个配置项，来表明在ts检查、编译过程中去支持什么标准的ES。

## 最后，欢迎大家在此讨论

积极汲取大家的讨论，补充我的文章（偷笑）。


<!--hexo-->

# core-js

虽然大部分开发者不直接使用core-js，甚至不知道它。我们使用webpack将ES6编译成老语法，实际上它在使用babel，而babel在使用core-js。

它是一个伟大的库，其原理是维护一系列polyfill进行版本、浏览器支持度、草案阶段等维度的分类。你既可以直接引用具体的polyfill，也可以根据草案阶段引入，也可以根据浏览器支持度引入。

它的作者是一个非常有趣，实诚的人。
