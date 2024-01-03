---
title: "7. GitHub Actions - 在pull request中执行eslint检测的工作流例子"
date: "2023-12-29T03:56:49Z"
categories:
  - [工程化]

url: github-actions-sample-eslint-in-pull-request
tags:
  - github actions

---


原文链接：[https://github.com/taoliujun/blog/issues/36](https://github.com/taoliujun/blog/issues/36)

<!--hexo
---
url: github-actions-sample-eslint-in-pull-request
tags:
  - github actions
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

<!--hexo-->

# 初始化workflow

在项目中新建文件`.github/workflows/check-pull-request.yml`，内容如下：

```yaml
name: test check pull request
run-name: 'check pull request #${{ github.event.pull_request.number }}'
on:
    pull_request:
        types: [opened, synchronize, reopened]
jobs:
    replyChecking:
        runs-on: ubuntu-latest
        steps:
            - run: echo 'replyChecking'

    init:
        runs-on: ubuntu-latest
        steps:
            - run: echo 'init'

    eslint:
        runs-on: ubuntu-latest
        needs: [init]
        steps:
            - run: echo 'eslint'

    typescript:
        runs-on: ubuntu-latest
        needs: [init]
        steps:
            - run: echo 'typescript'

    unitTest:
        runs-on: ubuntu-latest
        needs: [init]
        steps:
            - run: echo 'unitTest'

    replyResult:
        runs-on: ubuntu-latest
        needs: [replyChecking, eslint, typescript, unitTest]
        steps:
            - run: echo 'replyResult'
```

## name和run-name

给workflow命名为`check pull request`，它会出现在Actions页面的左侧菜单中。运行实例名为`check pull request #44`，出现在右侧的运行列表中。如图：

![](https://github.com/taoliujun/blog/assets/5689134/c1371ff2-8fc3-4e5b-8b60-3c572419938b)

`run-name`中的`${{ github.event.pull_request.number }}`是workflow的上下文，这里读取了上下文中的pr编号。

## on

`on`指定了workflow的触发条件，这里配置了在pr创建、同步、重新打开的时候，触发该workflow。

## jobs

按照设想，需要定义几个job，分别是：

-   replyChecking：回复用户正在检查中
-   init：初始化仓库，缓存依赖项
-   eslint：运行eslint检查
-   typescript：运行typescript检查
-   unitTest：运行单元测试
-   replyResult：回复用户检查结果

`jobs`是并行运行的，聪明如你肯定发现了，eslint、typescript、unitTest这三个job会涉及到安装npm依赖，所以它们最好在init后执行，确保依赖已经缓存了。

其次，replyResult肯定要拿到eslint等job的结果才能执行，所以使用了`needs`管理它们的执行依赖关系。

### runs-on

每个job都运行在独立的容器中，github官方提供了windows、macos、linux多种容器，这里使用了ubuntu容器。

## 测试

发起一个pr，看到Actions页面出现了新的运行实例，点击进去，可以看到各个job的运行情况和依赖关系：

![](https://github.com/taoliujun/blog/assets/5689134/09c86bc1-ada1-41c3-9f8f-7e6c46f8204e)

<!--hexo-->

# replyChecking

在进行eslint检测之前，先在pr里回复`checking`，并且带上拽酷炫的话。将replyChecking改成如下：

```yaml
replyChecking:
    runs-on: ubuntu-latest
    steps:
        - name: Checkout
          uses: actions/checkout@v4
          with:
              ref: ${{github.head_ref}}
        - name: Get date time
          id: getDateTime
          run: echo "result=$(TZ=Asia/Shanghai date)" >> "$GITHUB_OUTPUT"
        - name: Create or update a comment
          uses: ./.github/actions/unique-comment
          with:
              uniqueIdentifier: ${{ github.workflow }}
              body: |
                  **Checking...**

                  ---

                  Commented by Action [${{github.workflow}}](${{github.event.repository.html_url}}/actions/runs/${{github.run_id}}), last updated on ${{steps.getDateTime.outputs.result}}.
```

`steps`每一步里`name`、`id`是可选的，`name`在Actions详情页面里会显示，更直观的看到step的名称，推荐写上。

## Checkout

`uses`表示使用一个action，名为`actions/checkout@v4`，它用来拉取仓库。

> 同其他编程语言一样，重复的action可以封装起来。[action市场](https://github.com/marketplace?type=actions)提供了很多。

`with`属性指定了该action的输入参数，每个action的参数不尽相同。

`ref`参数表示要拉取的分支，`${{github.head_ref}}`也是一个上下文，表示当前pr的源分支。


## Get Date time

这step还写了`id`，表示该step在该job中的唯一标识，为什么要写呢？是为了下一步step能根据`id`读取到它的`output`。

> **output**是workflow中非常重要的概念，它用于在step之间、job之间分享简单的数据。

`run`就是在容器中跑一个命令，这里跑了一个unix bash命令，将当前时间写入到`$GITHUB_OUTPUT`中，键名为`result`。

> `$GITHUB_OUTPUT`是workflow注入到容器中的一个路径，用于存放output。

## Create or update a comment

`uses`使用了本地的action，这个action用于创建或更新一个唯一回复，下一节说。

> 有时候，官方或市场的action并不能满足你的需要，就得自己写一个了。

同理，该action也有`with`属性，`uniqueIdentifier`是回复评论的唯一标识，`body`是回复的内容，内容使用了markdown语法，里面还涉及到上下文不一一细讲了。只说`${{steps.getDateTime.outputs.result}}`这个上下文表示获取getDateTime这个step中，键名为`result`的值。

如果你不需要在内容里插入时间，那么上面的`Get Date time`就可以省略了。

## 测试

因为我已经有完整的代码了，所以运行后，pr中会有一个回复，如图：

![](https://github.com/taoliujun/blog/assets/5689134/42396a84-b798-4f4e-9f39-5bf92a8acb15)
<!--hexo-->

# ./.github/actions/unique-comment

这是一个封装的javascript action，用于对issue创建、更新唯一评论。

## 目录结构

创建目录`./.github/actions/unique-comment`，最终目录结构如下：

```bash
.
├── action.yml
├── config
│   └── webpack.config.js
├── dist
│   ├── index.js
│   └── index.js.LICENSE.txt
├── package.json
└── src
    └── index.js
```

## action.yml

这是action的配置文件，必须存在，内容如下：

```yaml
name: unique-comment
description: create or update a unique comment

runs:
    using: 'node20'
    main: './dist/index.js'

inputs:
    token:
        description: 'GitHub token'
        required: false
        default: ${{ github.token }}
    owner:
        description: 'Repository owner'
        required: false
        default: ${{ github.event.repository.owner.login }}
    repo:
        description: 'Repository name'
        required: false
        default: ${{ github.event.repository.name }}
    issue_number:
        description: 'Issue number'
        required: false
        default: ${{ github.event.number }}
    body:
        description: 'Comment body'
        required: false
    uniqueIdentifier:
        description: 'Unique identifier for comment'
        required: false
        default: 'unique-comment'
```

大部分属性不一一细讲了，都是简单的英文望文生义即可。

`runs`表示运行在`node20`环境下，入口文件为`./dist/index.js`。

`inputs`表示接受的参数，也就是之前提到的`with`属性里要输入的参数。用`required`表示是否必须传入，`default`表示默认值。

## src/index.js

为什么入口文件是`dist/index.js`，而不是`src/index.js`呢？因为要引用一些github官方提供的快捷操作github REST API的js包去操作issue评论(pull request也是一种issue)，最终打包后的文件才能在工作流中稳妥的运行。所以，写好`src/index.js`，再打包就行。

该文件代码如下：

```javascript
const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    const token = core.getInput('token');
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const issueNumber = core.getInput('issue_number');
    const uniqueIdentifier = `[^uniqueIdentifier]: ${core.getInput('uniqueIdentifier')}`;
    const body = `${core.getInput('body')}\n\n${uniqueIdentifier}`;

    core.debug(`uniqueIdentifier is ${uniqueIdentifier}`);

    const octokit = github.getOctokit(token);

    const comments = await octokit.rest.issues.listComments({
        owner,
        repo,
        issue_number: issueNumber,
    });

    const botComment = comments.data.find((v) => v.body.includes(uniqueIdentifier));

    if (botComment) {
        core.info('update comment successfully.');
        await octokit.rest.issues.updateComment({
            owner,
            repo,
            comment_id: botComment.id,
            body,
        });
    } else {
        core.info('create comment successfully.');
        await octokit.rest.issues.createComment({
            owner,
            repo,
            issue_number: issueNumber,
            body,
        });
    }
};

try {
    main();
} catch (err) {
    core.setFailed(err.message);
}
```

`@actions/core`和`@actions/github`是github官方提供的js包，前者可以方便的读取入参等，后者可以方便的操作github REST API。

`main`函数的代码就是原生javascript，不一一解释了，主要通过`uniqueIdentifier`来判断是否发布过评论，如果是，就更新评论，否则就创建评论。

> markdown语法`[^uniqueIdentifier]`表示脚注，不会被渲染。

`core.setFailed(err.message);`表示抛出退出代码。

## config/webpack.config.js

打包用的，配置简单可用即可：

```javascript
module.exports = {
    mode: 'production',
    target: 'node20',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        clean: true,
    },
};
```

## package.json

```json
{
  "name": "unique-comment",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "webpack --config ./config/webpack.config.js"
  },
  "dependencies": {
    "@actions/core": "^1.10.1",
    "@actions/github": "^6.0.0"
  },
  "devDependencies": {
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4"
  }
}
```

没啥好说的，列出了依赖项。和一个打包脚本。

## 测试

修改了`src/index.js`得`build`，然后push到github仓库。

记得将**dist**目录也提交到github仓库。

<!--hexo-->

# init

现在，开始搞正经的了。

先初始化项目，这个job的目的仅仅是为了缓存pnpm依赖项，如果你的项目的依赖项不经常更新，可以省略这个job，后续也不要`needs`这个job。

将init改成如下：

```yaml
init:
        runs-on: ubuntu-latest
        steps:
            - name: Init repo
              uses: actions/checkout@v4
              with:
                  ref: ${{github.head_ref}}

            - name: Init pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 8

            - name: Init node
              uses: actions/setup-node@v4
              with:
                  node-version: 20
                  cache: 'pnpm'

            - name: Install dependencies
              run: pnpm install
```

相信经过对之前的job的了解，这里的配置就看起来很简单了。

## Init pnpm

使用第三方action，安装pnpm@^8。

## Init node

`cache: 'pnpm'`指定缓存机制，它内部是利用了workflow的cache机制。

## Install dependencies

安装依赖项，触发缓存。
<!--hexo-->

# eslint

将eslint改成如下：

```yaml
eslint:
        runs-on: ubuntu-latest
        needs: [init]
        outputs:
            result: ${{ steps.lint.outputs.result }}
        steps:
            - name: Init repo
              uses: actions/checkout@v4
              with:
                  ref: ${{github.head_ref}}
                  fetch-depth: 0

            - name: Init pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 8

            - name: Init node
              uses: actions/setup-node@v4
              with:
                  node-version: 20
                  cache: 'pnpm'

            - name: Install dependencies
              run: pnpm install

            - name: Run eslint
              id: lint
              uses: actions/github-script@v7
              with:
                  result-encoding: string
                  script: |
                      let output = '';
                      let outerr = '';
                      let diffFiles = '';

                      await exec.exec(
                        `git diff --name-only origin/${{github.base_ref}}`,
                        [],
                        {
                          // silent: true,
                          // ignoreReturnCode: true,
                          listeners: {
                            stdout: (data) => {
                                diffFiles += data.toString();
                            },
                          },
                        }
                      );

                      const lintFiles = diffFiles.split(`\n`).filter((file) => {
                        return file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')
                      }).join(' ');

                      await exec.exec(
                        // "pnpm run lint --format stylish",
                        `pnpm eslint ${lintFiles}`,
                        [],
                        {
                          // silent: true,
                          ignoreReturnCode: true,
                          listeners: {
                            stdout: (data) => {
                                output += data.toString();
                            },
                            stderr: (data) => {
                                outerr += data.toString();
                            },
                          },
                        }
                      );

                      if (outerr) {
                        return `:x: Some command execution errors, non-eslint business errors.`;
                      }

                      const errorMatch = output.match(/(\d+) errors?/);
                      const warnMatch = output.match(/(\d+) warnings?/);

                      if (errorMatch && errorMatch?.[1] !== '0') {
                        return `:x: ${errorMatch?.[0]} ${warnMatch?.[0]}`;
                      }

                      return `:white_check_mark: ${errorMatch?.[0] || '0 error'} ${warnMatch?.[0] || '0 warning'}`;
```

## needs

使用`needs`依赖init，可以使用到pnpm的缓存项，防止install太慢。

> 因为eslint、typescript、unitTest都需要pnpm install，所以一个前置的init去缓存pnpm依赖项，可以加快后续的install速度。

## outputs

job里的outputs，可以在依赖它的其他job中访问到。这里使用`${{ steps.lint.outputs.result }}`去获取该job中lint这个step里的output里的result。

> output有job和step两个维度，注意区分。


## Run eslint

它uses了`actions/github-script@v7`，这是github官方提供的一个action，可以在`with.script`里写js代码去执行，同时它会注入一些变量到script中去，见它的[官方文档](https://github.com/actions/github-script/tree/v7/)。

> 对于简单的js代码，可以使用这个action去完成，不用再去写一个js文件。

`result-encoding`是指定script返回的数据格式的，默认是json，这指定为string。

> 为什么script里return了string，还要指定为string呢？
> 因为`return 'hello'`在json encode后是`'"hello"'`，而string encode后为`'hello'`。

script里是原生的js代码了，里面的`exec`是该action注入的变量，用来执行shell命令。

这段js代码做了两个事情，一是`git diff`获取pr中改动的文件列表，二是`eslint`检查这些增量文件，最后返回处理的结果。

## fetch-depth

Init repo这个step里设置了`fetch-depth: 0`，不然获取不到完整的git分支，具体看`actions/checkout`的解释，涉及到git的知识不展开细说了。

## steps.lint.outputs.result

`steps.lint.outputs.result`为什么能拿到lint step里的output.result呢？因为`actions/github-script`这个action内部将script的返回值，设置到`$GITHUB_OUTPUT`里了，且键名为`result`。
<!--hexo-->

# typescript

和eslint的配置大同小异，只是改了对检测结果的判断。

```yaml
typescript:
        runs-on: ubuntu-latest
        needs: [init]
        outputs:
            result: ${{ steps.lint.outputs.result }}
        steps:
            - name: Init repo
              uses: actions/checkout@v4
              with:
                  ref: ${{github.head_ref}}

            - name: Init pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 8

            - name: Init node
              uses: actions/setup-node@v4
              with:
                  node-version: 20
                  cache: 'pnpm'

            - name: Install dependencies
              run: pnpm install

            - name: Run lint
              id: lint
              uses: actions/github-script@v7
              with:
                  result-encoding: string
                  script: |
                      let output = '';
                      let outerr = '';

                      await exec.exec(
                        `pnpm run -r lint:ts`,
                        [],
                        {
                          // silent: true,
                          ignoreReturnCode: true,
                          listeners: {
                            stdout: (data) => {
                                output += data.toString();
                            },
                            stderr: (data) => {
                                outerr += data.toString();
                            },
                          },
                        }
                      );

                      if (outerr) {
                        return `:x: Some command execution errors, no business errors.`;
                      }

                      const errorMatch = output.match(/error TS/g);

                      if (errorMatch) {
                        return `:x: ${errorMatch?.length} errors`;
                      }

                      return `:white_check_mark: ${'0 error'}`;
```
<!--hexo-->

# unitTest

和eslint的配置大同小异，只是改了对检测结果的判断。唯一的区别是jest的检测结果是输出到stderr，见https://github.com/jestjs/jest/issues/5064。

```yaml
unitTest:
        runs-on: ubuntu-latest
        needs: [init]
        outputs:
            result: ${{ steps.lint.outputs.result }}
        steps:
            - name: Init repo
              uses: actions/checkout@v4
              with:
                  ref: ${{github.head_ref}}

            - name: Init pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 8

            - name: Init node
              uses: actions/setup-node@v4
              with:
                  node-version: 20
                  cache: 'pnpm'

            - name: Install dependencies
              run: |
                  pnpm remove @nike/eslint-multi-formatter || true
                  pnpm remove @nike/svg-packer || true
                  pnpm install

            - name: Run lint
              id: lint
              uses: actions/github-script@v7
              with:
                  result-encoding: string
                  script: |
                      let output = '';
                      let outerr = '';

                      await exec.exec(
                        `pnpm run test`,
                        [],
                        {
                          // silent: true,
                          ignoreReturnCode: true,
                          listeners: {
                            stdout: (data) => {
                                output += data.toString();
                            },
                            stderr: (data) => {
                                outerr += data.toString();
                            },
                          },
                        }
                      );

                      // why use outerr? https://github.com/jestjs/jest/issues/5064

                      const failMatch = outerr.match(/Test Suites: \d+ failed/);

                      if (failMatch) {
                        return `:x: ${failMatch?.[0]}`;
                      }

                      const errorMatch = outerr.match(/Jest: "global" coverage threshold for lines \([0-9\.]+%\) not met: [0-9\.]+%/);

                      if (errorMatch) {
                        return `:x: ${errorMatch?.[0]}`;
                      }

                      return `:white_check_mark: passed`;
```
<!--hexo-->

# replyResult

最后，将几个检测的结果进行汇总，回复到pr里就行了。

```yaml
replyResult:
        runs-on: ubuntu-latest
        needs: [replyChecking, eslint, typescript, unitTest]
        steps:
            - name: Checkout
              uses: actions/checkout@v4
              with:
                  ref: ${{github.head_ref}}
            - name: Get date time
              id: getDateTime
              run: echo "result=$(TZ=Asia/Shanghai date)" >> "$GITHUB_OUTPUT"
            - name: Create or update a comment
              uses: ./.github/actions/unique-comment
              with:
                  uniqueIdentifier: ${{ github.workflow }}
                  body: |
                      ## Eslint Check Result

                      ${{needs.eslint.outputs.result}}

                      ## Typescript Check Result

                      ${{needs.typescript.outputs.result}}

                      ## UnitTest Check Result

                      ${{needs.unitTest.outputs.result}}

                      ---

                      Commented by Action [${{github.workflow}}](${{github.event.repository.html_url}}/actions/runs/${{github.run_id}}), last updated on ${{steps.getDateTime.outputs.result}}.
```

和replyChecking差不多，在body里使用`${{needs.eslint.outputs.result}}`去读取了eslint job的outputs。

## 测试

去发起新的pr，故意提交一个有eslint error的js/ts文件，看看表现吧~

