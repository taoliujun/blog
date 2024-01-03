---
title: "整理ES6：Map真的挺好的"
date: "2023-07-06T06:34:11Z"
categories:
  - [JavaScript]

url: es6-map
tags:
  - es6
  - javascript

---


原文链接：[https://github.com/taoliujun/blog/issues/13](https://github.com/taoliujun/blog/issues/13)

<!--hexo
---
url: es6-map
tags:
  - es6
  - javascript
---
-->

在以前，想要维护一个集合去处理dom和其附加信息的关系，使用Array方式如下：

```ts
const list = [
  {
    dom: dom1,
    info: { area: 123 },
  },
  {
    dom: dom2,
    info: { area: 123 },
  },
];
```

如上代码有个很难受的问题，就是读取某个dom的时候需要遍历，而且每次都需要遍历，如果数据量大的话，性能会很差。

那么改成Object方式：

```ts
const list = {
  key1: {
    dom: dom1,
    info: { area: 123 },
  },
  key2: {
    dom: dom1,
    info: { area: 123 },
  },
};
```

这种方式虽然可以快速读取，但是如何处理key和dom的关系又是一个麻烦；并且如果需要遍历的话，就需要先转成Array，然后再遍历，这样也很麻烦。

## Map的基础用法

但是使用Map可以方便的解决上面的问题：

```ts
const list = new Map([
  [dom1, { area: 123 }],
  [dom2, { area: 123 }],
]);
```

这样就可以快速的读取dom对应的信息，也可以快速的遍历。

## 注意点

* Map的键是内存引用，所以两个相同值的对象实例，它们是两个键。
* Map采取了和Set一样的比较算法，所以虽然NaN不严格相等于自身，但 Map 将其视为同一个键。



