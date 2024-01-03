---
title: "TypeScript的小手段，最后更新2023/12月..."
date: "2023-08-03T01:52:04Z"
categories:
  - [TypeScript]

url: typescript-means
tags:
  - typescript

---


原文链接：[https://github.com/taoliujun/blog/issues/22](https://github.com/taoliujun/blog/issues/22)

<!--hexo
---
url: typescript-means
tags:
  - typescript
---
-->

TypeScript有一些小手段，评论区见。


- [as断言的另外写法](#issuecomment-1663199481)
- [as const](#issuecomment-1663206615)
- [非null | undefined声明](#issuecomment-1663206898)
- [const enum](#issuecomment-1838108783)
- [@ts-expect-error](#issuecomment-1841954904)
- [解构变量可标记为“不使用”](#issuecomment-1842016788)

<!--hexo-->

# as断言的另外写法

```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

将断言类型写在前面的括号里，等同于：

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

但是不能再`.tsx`中使用。
<!--hexo-->

# as const

```typescript
function test1(name: 'html' | 'css') {
    console.log(name);
}

const obj1 = { name: 'html' };
test1(obj1.name);
```

上面的例子有一个类型错误：`Argument of type 'string' is not assignable to parameter of type '"html" | "css"'.`，这是因为，ts对可读写的变量，推断出的类型是非字面类型。

改下代码：

```typescript
const obj1 = { name: 'html' } as const;
```

`as const`是断言成该变量的字面类型，关于`const`的字面类型断言解释如下。

```typescript
let a = '1';
const b = '2';
```

ts对`a`的推断是`string`，对`b`的推断是`'2'`。在ts的类型推断的设计中，它总是尽可能的推断出更广的类型，但是对于`readOnly variable`，因为不可变，它的更广的类型就是字面类型。

得益于 https://github.com/taoliujun/blog/issues/22#issuecomment-1663199481 ，还可以写成`let a = <const>'1';` 
<!--hexo-->

# 非null | undefined声明

有时候虽然声明一个变量类型是`null`，但在某个逻辑中它不可能是`null`，可以使用`!`来表示它不是`null`。

```typescript
const d1 = document.getElementById('test1');
// 'd1' is possibly 'null'
console.log(d1.getBoundingClientRect());
// it is fine
console.log(d1!.getBoundingClientRect());
```
<!--hexo-->

# const enum

ts会将`enum`完整的编译出来，如下分别是ts源码和编译后的代码：

```ts
// 源码
enum Sex {
    Man,
    Woman,
}
const sex = Sex.Man;
```

```javascript
// 编译结果
var Sex;
(function (Sex) {
    Sex[Sex["Man"] = 0] = "Man";
    Sex[Sex["Woman"] = 1] = "Woman";
})(Sex || (Sex = {}));
const sex = Sex.Man;
```

而很多时候，我们只是将`enum`当安全值来用，编译后只保留安全值就行了。加上`const`就可以：

```typescript
// 源码
const enum Sex {
    Man,
    Woman,
}
const sex = Sex.Man;
```

```javascript
// 编译结果
const sex = 0;
```
<!--hexo-->

# @ts-expect-error

在一些场景下，我们需要故意传一个错误类型的变量，比如在写单元测试的时候。如下：

```ts
// util.ts
function test1(p1: number) {
  // do
}

// __test__
test1('hello');
```

在如上的单元测试代码中，ts会反馈`'hello'`不是一个number，但这个类型错误正是我们期望的。那么就增加一个标记来处理它：

```ts
// __test__

// @ts-expect-error
test1('hello');
```

并且，如果这行语句没有类型错误的话，该注释本身会被认为是一个错误，以及时提醒开发者。

```ts
// Unused '@ts-expect-error' directive.ts(2578)
// @ts-expect-error
test1(123);
```

它和`ts-ignore`的区别在这：https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#ts-ignore-or-ts-expect-error
<!--hexo-->

# 解构变量可标记为“不使用”

如下语句，ts会告诉你`first`未使用。

```ts
// 'first' is declared but its value is never read.ts(6133)
const [first, second] = [1, 2];
console.log('==', second);
```

但在场景里，就不需要使用第一个变量，ts提供了一个写法标记来忽略检查未使用的解构变量，就是在变量前加`_`。

```ts
const [_first, second] = [1, 2];
console.log('==', second);
```

**补充：** 以上是ts4.2的特性，在更新的版本里，只要这样写就行了：`const [, second] = [1, 2]`。


