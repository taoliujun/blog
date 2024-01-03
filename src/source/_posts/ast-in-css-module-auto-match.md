---
title: "AST 在 css module 自动匹配中的应用"
date: "2023-07-26T08:03:32Z"
categories:
  - [JavaScript]
  - [工程化]

url: ast-in-css-module-auto-match
tags:
  - ast
  - css module

---


原文链接：[https://github.com/taoliujun/blog/issues/21](https://github.com/taoliujun/blog/issues/21)

<!--hexo
---
url: ast-in-css-module-auto-match
tags:
  - ast
  - css module
---
-->

# AST 在 css module 自动匹配中的应用

我们已经非常明白为什么在项目中要使用 css modules，可直接说到“自动匹配”有点莫名其妙，所以有必要介绍下为什么提出这个问题。

第一步，我想用官方的话来镇住大家。

> [css modules](https://github.com/css-modules/css-modules)的官方描述：A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

官方只提供了一个规范的描述，本身并未提供工具去实现。但无需担心，常见的打包工具都支持了 css modules。比如 webpack 的[css-loader](https://webpack.js.org/loaders/css-loader/)。

## css-loader

css-loader 在很早就支持 modules，只需要配置`modules`属性，程序员们使用它的方式是各种各样的。有设置 local modules，在 css 文件中使用`:global`来支持全局样式的；有设置 global modules，在 css 文件中使用`:local`来支持局部样式的。这些都是可以的，但是都需要在 css 文件中做一些特殊的标记，这样就会导致 css 文件的可读性变差。

后来人们学会了配置根据 css 文件名中是否包含`.modules.`或`.global.`字符串来启用/禁用该文件的 modules 功能。于是项目里有大量的*.modules.css/*.global.css 文件，而通过文件名去匹配某个功能的开关却恰恰是程序设计的忌讳。

## 符合直觉的自动识别

我就在 \*.modules.css 文件堆中浑浑噩噩的度过了好多年，直到近两年的某一天在[UmiJS](https://umijs.org/)脚手架中发现了这个奇特的细节。

**使用`import xxx from './styles.css'`启用 modules，使用`import './styles.css'`启用 global。**

这思路对我来说简直是惊为天人，无关乎它的技术细节。因为在直觉中，`import module`就是要直接执行它，而`import xxx from module`就是要使用它的某些东西。对于 css 是同样的，既要直接引入全局样式，又要使用局部样式。

## 技术细节

webpack 的 module rules 支持使用`resourceQuery`去匹配模块文件名的 query 部分，所以为 css-loader 增加一个 rules 如下：

```typescript
{
  test: /\.css$/,
  oneOf: [
    {
      resourceQuery: /modules/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { modules: true } },
      ],
    },
    {
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    },
  ],
}
```

如此，使用`import xxx from './styles.css?modules'`就会命中第一个规则而启用 modules 功能了。

但显然这样写太麻烦了，有什么办法让它在写`import xxx from './styles.css'`时候，自动加上`?modules`而启用 css modules 呢？

答案就是使用 AST。由于项目几乎都在使用 babel 去处理 js 文件，所以可以直接使用 babel 插件去分析 AST 从而给 css 文件加上`?modules`后缀即可。就直接看[umijs 的插件代码](https://github.com/umijs/umi/blob/master/packages/babel-preset-umi/src/plugins/autoCSSModules.ts):

```typescript
import * as Babel from "@umijs/bundler-utils/compiled/babel/core";
import * as t from "@umijs/bundler-utils/compiled/babel/types";
import { extname } from "path";

const CSS_EXT_NAMES = [".css", ".less", ".sass", ".scss", ".stylus", ".styl"];

export default function () {
  return {
    visitor: {
      ImportDeclaration(path: Babel.NodePath<t.ImportDeclaration>) {
        const {
          specifiers,
          source,
          source: { value },
        } = path.node;
        if (specifiers.length && CSS_EXT_NAMES.includes(extname(value))) {
          source.value = `${value}?modules`;
        }
      },

      // more codes
    },
  };
}
```

如上代码中，AST `specifiers` 里有内容，说明是`import xxx from module`的形式，而`source.value`就是 css 文件的路径，所以直接加上`?modules`后缀即可。

## 参考

- https://github.com/css-modules/css-modules
- https://webpack.js.org/loaders/css-loader/#modules
- https://www.npmjs.com/package/@umijs/babel-plugin-auto-css-modules




