---
title: "snapshot对单测覆盖率的影响以及应对方案"
date: "2024-01-09T08:44:02Z"
categories:
  - [工程化]

url: snapshot-impact-on-coverage
tags:
  - jest

---


原文链接：[https://github.com/taoliujun/blog/issues/46](https://github.com/taoliujun/blog/issues/46)

<!--hexo
---
url: snapshot-impact-on-coverage
tags:
  - jest
---
-->

Jest snapshot是把双刃剑，虽然使用它可以快速的编写测试用例，但它导致开发者忽略了测试用例的细节设计。

## 问题

试想一个场景，有一个方法返回了复杂的结构，开发者A由于懒惰或自信以后能根据snapshot的结果来修复问题，而只写了snapshot。过了一段时间，开发者A或B修改了该方法，发现snapshot匹配失败，那么他会这样做：

1. 仔细检查匹配失败的原因，然后或修改代码、或更新snapshot。
2. 直接更新snapshot。

我相信，大部分人都会选择第二种方式，因为这样更快，更简单。但后果是，大家都只关心了方法的结果，而忽略了方法的细节设计，这样的测试用例是不可靠的。即便在pull request环节，Reviewers面对难以阅读的snapshot文件，也往往是选择了approve。

所以，需要一个方案来实现几个目的：

- 保留snapshot对复杂结构进行测试。
- snapshot不提高覆盖率，因为低覆盖率会警告开发者去关注测试用例的细节设计。

## 方案

因为jest的限制，执行用例肯定会影响覆盖率。那么可以执行两次用例，一次是执行包含snapshot的文件来校验用例，一次是执行不包含snapshot的文件来生成测试覆盖率。

于是，新增两个`script`：

```json
// package.json
"scripts": {
  "test": "pnpm exec jest",
  "test:coverage": "pnpm exec jest --config=jest.coverage.config.js",
},
```

默认的`jest.config.js`配置不包含覆盖率配置，而`jest.coverage.config.js`包含覆盖率配置。

```js
// jest.config.js
module.exports = {
    // ...
};
```

```js
// jest.coverage.config.js
const baseConfig = require('./jest.config');

module.exports = {
    ...baseConfig,

    testMatch: ['**/src/**/__tests__/**/*.ts', '!**/src/**/__tests__/**/*.snap.test.ts'],

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.snap.test.ts', '!src/index.ts'],
    coverageDirectory: 'reports/jest',
    coverageThreshold: { global: { lines: 90, branches: 50 } },
    coverageReporters: ['html'],
};
```

在`jest.coverage.config.js`中，`testMatch`排除执行`.snap.test.ts`用例文件，`collectCoverageFrom`也排除了`.snap.test.ts`文件本身作为源码文件被收集的问题。

接下来，只需要把包含`toMatchSnapshot`等方法的测试用例，单独成文件且命名为`*.snap.test.ts`，就可以了。



