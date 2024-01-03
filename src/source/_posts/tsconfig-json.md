---
title: "关于tsconfig.json，最后更新2023/11月..."
date: "2023-09-05T02:51:45Z"
categories:
  - [TypeScript]

url: tsconfig-json
tags:
  - typescript

---


原文链接：[https://github.com/taoliujun/blog/issues/23](https://github.com/taoliujun/blog/issues/23)

<!--hexo
---
url: tsconfig-json
tags:
  - typescript
---
-->

**截至TypeScript 5.2**，`tsconfig.json`的配置项已经有百十个之多，它的某些选项甚至影响了项目的执行结果，所以尽量多的了解它们能让程序员更深的了解ts，写出优美语句让CTO赞赏，甚至避免写出bug。

本issue的内容，只是个人在工作经验的影响下，对官方文档的内容理解。且内容有所欠缺，基本只记录了我工作涉及到的配置项，比如不怎么使用class，对class的配置项就略过了。

官方文档：https://www.typescriptlang.org/tsconfig

****

<!--hexo-->

# Top Level

一些根配置项。

## extends

继承另一个配置文件，推荐的一些官方的配置文件来继承使用：https://github.com/tsconfig/bases/tree/main/bases

## files, include, exclude

这几项指定了在项目里，被ts作用的文件集合。配置本身没什么好说的，记录下它们之间的关系。

- 如果files指定了，那么include的默认值是`[]`，否则include的默认值是`**/*`；
- exclude用于排除include已指定的文件集合，但这些文件仍然是可以在项目里被引用的；
- exclude默认排除了`node_modules`、`outDir`；

## references

用于项目文件夹分别打包，并且其中有缓存机制的参与，所以编译速度会快很多。

如下项目结构：

```shell
./interface
./components
./user
./admin
./tsconfig.json
```

在上面，user和admin文件夹分别是业务用户端、业务管理端，interface是接口定义，components是通用组件。在以往，改动了任何文件，都需要整个项目重新编译。而在使用references之后，将4个文件夹中放入对应的tsconfig.json并各有配置，在根tsconfig中指定好references的path后，tsc利用缓存机制，会只打包改动过的文件夹。
<!--hexo-->

# compilerOptions

编译器配置项太多了，按作用拆分成几个评论来说。
<!--hexo-->

# compilerOptions - Type Checking

和类型检查有关的配置项。

## strict

strict是一个严格模式的快捷开关，开启后会默认打开strictNullChecks、noImplicitAny等选项。并且随着typescript的升级，它可能会默认开启新增特性，列出截至5.2默认开启的选项：

[alwaysStrict](https://www.typescriptlang.org/tsconfig#alwaysStrict)
[strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)
[strictBindCallApply](https://www.typescriptlang.org/tsconfig#strictBindCallApply)
[strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)
[strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization)
[noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny)
[noImplicitThis](https://www.typescriptlang.org/tsconfig#noImplicitThis)
[useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables)

## alwaysStrict

对所有文件启用javascript strict模式。注意，这和typescript strict不是同一个东西。参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

## allowUnreachableCode

对未使用的代码的处理策略，可设置警告(默认)、错误、忽略。

## allowUnusedLabels

对未使用的Label的处理策略，可设置警告(默认)、错误、忽略。

## exactOptionalPropertyTypes

对可选项设置为undefined的策略。

举例：
```typescript
interface User {
    sex?: 1 | 0;
}

const man: User = {};
man.sex = 1;
man.sex = 0;
man.sex = undefined;
```

`User.sex`是一个可选项，它的预期值是`0|1|undefined`。但是呢，`sex`可选想表达的意思是未被定义，而不是值真的是undefined。那么开启本选项后，`man.sex = undefined`这个赋值语句会给一个报错。

## noImplicitAny

对推导类型为any的策略。

```typescript
function fn(s) {
  console.log(s.subtr(3));
}
```

入参`s`推导为`any`，在选项开启情况下会报错。

## noImplicitReturns

对函数每个分支必须有return语句的策略。

```typescript
function fn(s: string) {
    if (s) {
        return s.substring(3);
    } else {
        'nothing';
    }
}
```

开启后，ts报错认为`fn`函数的最后没有return语句。

## noPropertyAccessFromIndexSignature

对访问未定义的对象属性的策略。

```typescript
interface User {
    name?: string;
    [key: string]: string;
}
const a: User = {};
console.log(a.name, a['name'], a.sex, a['sex']);
```

访问对象属性有`.`和`[index]`两个方式，访问未定义的属性，开启本选项后，在`a.sex`处会抛出一个错误。

## noUncheckedIndexedAccess

未定义的对象属性值类型，给追加上`undefined`类型。

```typescript
interface User {
    name: string;
    [propName: string]: string;
}

declare const admin: User;

// (property) User.name: string
console.log(admin.name);
// (index) User[string]: string
console.log(admin.birthday);
```

上例中，birthday的值类型是`string`，开启本项后，类型追加上`undefined`。

```typescript
// (index) User[string]: string | undefined
console.log(admin.birthday);
```

## noUnusedLocals

局部变量未使用，抛出错误。

```typescript
function test() {
  const defaultModelID = 23;
// 'defaultModelID' is declared but its value is never read.
}
```

## noUnusedParameters

入参未使用，抛出错误。

```typescript
const createDefaultKeyboard = (modelID: number) => {
// 'modelID' is declared but its value is never read.
  const defaultModelID = 23;
  return { type: "keyboard", modelID: defaultModelID };
};
```

## strictBindCallApply

在使用函数的call、bind、apply时，是否要检查传入参数的类型。

```typescript
function fn(x: string) {
    return x;
}
const n1 = fn.call(undefined, '10');
const n2 = fn.call(undefined, false);
```

如上代码中，第二个call中的入参false和string类型不匹配而报错。

## strictFunctionTypes

更精确的检查函数入参类型。

```typescript
type GetUser = (id: string | number) => any;
function test(x: string) {
    return x;
}
const getUser: GetUser = test;
```

如上代码中，GetUser的入参类型`string | number`不能精确的分配给test的入参类型`string`。

## strictNullChecks

是否校验`null`, `undefined`的属性访问？

在以往的纯js项目中，容易忽略变量为undefined后仍然访问其属性的场景，比如在如下代码中，忽略了`a`为`undefined`的情况，导致运行时引发异常。

```javascript
const a = arr1.find();
console.log(a.name)
```

本选项开启后，在静态检查时就提示开发者，变量可能是`null`, `undefined`，不能访问到`name`属性。

## useUnknownInCatchVariables

有时候我们并不知道catch的err类型是什么，它的类型由try里的实际运行分支决定，而如果当成any处理，那么访问它的属性是危险的。当开启本项后，err的类型是unknown，必须先限定其类型再安全的访问其属性，如：

```typescript
try {
  // ...
} catch (err) {
  if (err instanceof Error) {
    console.log(err.message);
  }
}
```

<!--hexo-->

# compilerOptions - Modules

模块的处理策略。

## allowArbitraryExtensions

ts默认支持了ts、js、cjs、jsx等模块的解析描述，通过`global.d.ts`的定义扩展，还可以支持css、jpg等模块的解析描述（你要自己保证webpack loader之类的解析器去真实支持加载这些模块）。而有时候，需要对特定模块文件（不管是否已全局定义过该模块的描述）做特别的描述，就可以开启该选项，并且创建一个`{file basename}.d.{extension}.ts`文件。

如：

```typescript
// test.ts

// 报错：Cannot find module './a.jpk' or its corresponding type declarations.ts(2307)
import a from './a.jpk';
// doTest类型是any
console.log(a.doTest());
```

开启该项，并增加`a.d.jpk.ts`文件：

```typescript
// a.d.jpk.ts
declare const jpk: {
    doTest: () => void;
};
export default jpk;

// test.ts
import a from './a.jpk';
// doTest的类型：(property) doTest: () => void
console.log(a.doTest());
```

## allowImportingTsExtensions

是否允许在import path带入ts、tsx等后缀名。

ts项目需要编译成js代码后执行，如果我们使用ts-node来执行项目，可以启用`noEmit`来禁止这个编译行为，并且在项目源码中直接引入`.ts`来引入正确的、完整的路径。

举例：

```typescript
import { wait } from '@/utils/utils.ts';
```

## allowUmdGlobalAccess

// TODO
和umd的声明有关系，不过我还不明确它的意义。见：https://github.com/microsoft/TypeScript/pull/30776。

## baseUrl

为解析无路径修饰的模块，设置一个基础路径。 什么叫做无路径修饰？就是该模块不是一个绝对或相对路径，如`import a from '@/hello/world'`。

如果配置了该项，那么ts从该项指定的目录中开始查找模块，优先级也高于`node_modules`。

## module

模块打包的策略，也就是指编译后的模块加载代码是require、import之类的语法。推荐大家阅读：[模块理论](https://www.typescriptlang.org/docs/handbook/modules/theory.html)。

这个话题有点繁琐，也涉及到javascript的模块化amd、umd之类的历史，对于2023年这个时间点来说，关注下CommonJS、ESM即可，ESM还细分为ES2015、ES20XX等版本，他们的模块打包策略是一样的，区别是更高版本的ESM还支持了`dynamic imports`、`import.meta`和`top level await`之类的东西。

补充的是，nodejs的模块打包策略也早就支持esm了，具体参照package.json的设置：https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext

## moduleResolution

加载模块的策略，也就是指用什么策略去解析`import xxx from 'pathA'`这里的`pathA`。**注意区分和module的关系，module指的是项目的模块化是如何打包的，而moduleResolution指的是项目如何加载模块的**。截至2023支持如下策略：

* node16/nodenext，对于Node12+版本，本策略可自由根据import/require选择合适的算法去加载模块。
* node10，对于Node12之前的版本，本策略只支持require算法加载模块。**基本不用关心了**
* bundler，和node16一样，但不要求模块有后缀名。
* classic，早期的策略，不用管了。

**这东西还要和module搭配使用，并且！并且！和package.json还有扯不清的关系。强烈建议阅读上文提到的[模块理论](https://www.typescriptlang.org/docs/handbook/modules/theory.html)**

另外，由于自己对这块的理解也不足深，还参考了这篇文章：https://zhuanlan.zhihu.com/p/621795173。

## moduleSuffixes

模块搜索时的文件扩展名补充，比如以下配置项：

```json
{
  "compilerOptions": {
    "moduleSuffixes": [".ios", ".native", ""]
  }
}
```

```typescript
import * as foo from "./foo";
```
TypeScript 会按顺序寻找`./foo.ios.ts`、`./foo.native.ts`、`./foo.ts`。

## paths

在加载模块路径时，加入一个别名匹配。可以理解为webpack的alias。

## resolveJsonModule

允许加载json模块（文件）。

## resolvePackageJsonExports

引用`node_modules`包时，强制遵循包package.json的exports字段的定义。还是那句话，阅读下模块理论那篇文章，不然很难理解前面这句话的信息量。

## resolvePackageJsonImports

强制typescript使用package.json中imports字段的定义去加载`#`符号开头的模块路径。例：

```typescript
// package.json
"imports": {
   "#test/*": "./src/test/*"
}
```

```typescript
// src/test/1.ts
export const a = 123;
```

```typescript
// src/b.ts
import { a } from '#test/1';
console.log('==a', a);
```

## rootDir

指定项目的根目录，默认值可以理解为所有ts文件目录的最大集。例如：

```shell
MyProj
├── tsconfig.json
├── core
│   ├── a.ts
│   ├── b.ts
│   ├── sub
│   │   ├── c.ts
├── types.d.ts
```

如上的项目，rootDir的推断值是"core"。但是你可以手工指定为`tsconfig.json`的相对目录"，比如."。

另外，如果设置了`composite`，`rootDir`的默认值就是`tsconfig.json`文件的目录。

## rootDirs

这个属性有点拽，它可以将多个目录虚拟成一个目录。这样在`import`的时候，就当成同一个目录就行啦。

## typeRoots

类型定义文件的目录，默认所有@types目录都会被包含，包括node_modules下的@types目录。
如果指定了typeRoots，那么@types目录的相关规则会被忽略。

 ## types

类型定义文件的具体目录，规则和`typeRoots`一样，不同点是`types`只指定具体目录，而非`*`这种匹配型目录。

<!--hexo-->

# compilerOptions - Emit

编译策略。

## outDir

编译文件放置的目录，默认和源码放同一个目录。

## noEmit

不要编译ts。

项目中一般使用babel去编译，typescript仅用来做静态检查，所以设置noEmit就可以不生成js、sourcemap、declaration文件了。

## noEmitOnError

顾名思义，在检查到错误的时候，不要继续编译了。

## declaration / emitDeclarationOnly / declarationDir

生成类型描述文件。

这个是typescript最重要的几个特性之一了，为`.ts`文件生成类型定义文件`.d.ts`。如果不想同时生成`.js`文件，则使用`emitDeclarationOnly`。

同时，可以使用`declarationDir`指定类型定义文件的生成目录。

## declarationMap

给`.d.ts`文件增加一个map标识到`.ts`源文件，类似sourceMap。

## sourceMap / inlineSourceMap / inlineSources / mapRoot / sourceRoot

typescript也是支持souce map的，这里就不解释sourcemap是什么了。它的相关配置项有：

sourceMap，生成sourcemap文件。
inlineSourceMap，不生成sourcemap文件，而是直接把source内容写在.js文件中。
inlineSources，同inlineSourceMap。
mapRoot，指定sourceMap文件的路径，比如部署到网络中，可以指定为"[http://xxxx.com"。](http://xxxx.com"./)
sourceRoot，指定source文件的路径，同mapRoot。

## downlevelIteration

对迭代器的降级解析。

在es6中增加了for/of，spread等迭代特性，typescript在编译成es5的时候，要使用何种语法。文档中有个字符遍历的例子说明开启与否的迭代影响，这对业务计算结果是有影响的。

不过项目中使用了babel之类的编译器，就不用担心这些影响了。

## importHelpers

引入降级解析的包。

将es6的某些特新编译成es5，如迭代器、异步语法等，会将模块中每个相应的代码都编译成降级代码，使得类似代码重复。如：

```typescript
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function fn(arr) {
    var arr2 = __spreadArray([1], __read(arr), false);
}
```

如果同时开启了`downlevelIteration`和`importHelpers`，并且安装了`tslib`包，那么代码会编译成类似这样：

```typescript
import { __read, __spreadArray } from "tslib";
export function fn(arr) {
    var arr2 = __spreadArray([1], __read(arr), false);
}
 ```

## noEmitHelpers

typescript处理迭代器、异步等的降级策略是生成一堆降级代码，也可以使用"importHelpers"和"tslib"来提取公共代码。但通过这个配置，可以自定义降级代码了。具体参照文档。

## preserveConstEnums

是否在编辑结果中移除`const enum`的定义。因为javascript没有enum概念，typescript会将enum的引用编译成具体的值。如：

```typescript
const enum Album {
  JimmyEatWorldFutures = 1,
  TubRingZooHypothesis = 2,
  DogFashionDiscoAdultery = 3,
}
 
const selectedAlbum = Album.JimmyEatWorldFutures;
if (selectedAlbum === Album.JimmyEatWorldFutures) {
  console.log("That is a great choice.");
}
```

编译结果如下：

```javascript
"use strict";
const selectedAlbum = 1 /* Album.JimmyEatWorldFutures */;
if (selectedAlbum === 1 /* Album.JimmyEatWorldFutures */) {
    console.log("That is a great choice.");
}
```

如果开启此项，则编译结果中会描述出该enum的结构。如下：

```javascript
"use strict";
var Album;
(function (Album) {
    Album[Album["JimmyEatWorldFutures"] = 1] = "JimmyEatWorldFutures";
    Album[Album["TubRingZooHypothesis"] = 2] = "TubRingZooHypothesis";
    Album[Album["DogFashionDiscoAdultery"] = 3] = "DogFashionDiscoAdultery";
})(Album || (Album = {}));
const selectedAlbum = 1 /* Album.JimmyEatWorldFutures */;
if (selectedAlbum === 1 /* Album.JimmyEatWorldFutures */) {
    console.log("That is a great choice.");
}

```

## preserveValueImports

通常，打包器会将未使用的"import"移除掉，但开启了该特性后，会在编译中保留未使用的"import"。例如：

```typescript
import { Animal } from "./animal.js";
eval("console.log(new Animal().isDangerous())");
```

## removeComments

移除代码中的注释。


<!--hexo-->

# compilerOptions - JavaScript Support

对javascript文件的支持

## allowJs

允许`.ts`文件引用`.js`文件，这常用在javascript项目升级为typescript的过程中。

## checkJs

是否开启对`.js`文件的错误检查。

## maxNodeModuleJsDepth

为`.js`文件寻找类型定义文件时，允许的最大依赖深度。

正常情况下，我们会在`.js`文件的同级补写`.d.ts`文件，tsc会很快找到类型定义。但有时候确实要扩大搜索范围去找部分`.js`文件的类型定义文件。

<!--hexo-->

# compilerOptions - Interop Constraints

(模块)互相操作的约束

## allowSyntheticDefaultImports

允许合成`default`。

如果一个模块A没有`export default`，那么另一个模块B在`import defaultA from './a'`的时候，会抛出错误说A中没有default。

有一个做法是`import * as defaultA from './a'`曲线救国，但开启这个配置项后，可以直接使用`import defaultA from './a'`这样的语法了。

## esModuleInterop

esm在使用`import default from 'xxx'`方式导入cjs的时候会抛出一个错误，因为cjs模块中没有default。开启此选项后，typescript会使用一些helpers去兼容cjs的default问题。

## forceConsistentCasingInFileNames

强制引用的模块文件名，和磁盘中的文件名保持一致的大小写。

<!--hexo-->

# compilerOptions - Language and Environment

和语言、环境有关的配置项。

## jsx

如何解析`.tsx`文件中jsx语法？在2023年，react17+后，用`react-jsx`就行了。

## lib

在项目中使用的api类型定义集合。

ts是需要知道你用的每一个javascript方法、属性的定义的，所以它内置了一批定义（比如Math.abs方法）。但是呢，后面新增方法的定义，需要你手工指定包含，ts才能理解了，比如Array.include方法，你就要包含ES2016。但好在你不需要记住这些，因为当你指定`target`字段时，lib会被默认设置成对应的值的。

另外，大部分情况下，我们要访问一些和特定环境有关的特性，比如浏览器里的Dom特性，那么这儿额外引入`DOM`定义就行了。

## target

项目编译的目标javascript版本。

也就是你的目标客户端支持的最低javascript版本。注意它会影响默认的`lib`配置项。


<!--hexo-->

# compilerOptions - Compiler Diagnostics

编译诊断配置项。

## diagnostics / extendedDiagnostics

打印出编译的信息，比如多少文件、编译时间等。

extendedDiagnostics包含了diagnostics给出的所有信息，所以用extendedDiagnostics就行了。这是一个开启extendedDiagnostics的编译信息：

```bash
Files:                         143
Lines of Library:            38663
Lines of Definitions:        82578
Symbols:                     73362
Types:                        1495
Parse time:                  0.50s
ResolveModule time:          0.03s
Total time:                  1.01s
```

## explainFiles

打印出文件被编译的原因，也就是它们的引用链。

## listEmittedFiles / listFiles

列出参与编译的文件。

## traceResolution

打印每一个文件的编译流程。


<!--hexo-->

# compilerOptions - Completeness

完整性检测的配置项

## skipLibCheck

跳过lib库的类型检测。



