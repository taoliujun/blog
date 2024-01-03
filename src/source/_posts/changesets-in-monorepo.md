---
title: "在monorepo中使用changesets"
date: "2023-12-08T09:44:30Z"
categories:
  - [工程化]

url: changesets-in-monorepo
tags:
  - changesets

---


原文链接：[https://github.com/taoliujun/blog/issues/33](https://github.com/taoliujun/blog/issues/33)

<!--hexo
---
url: changesets-in-monorepo
tags:
  - changesets
---
-->

`changesets`是目前(2023年)最流行的(多)包管理和发布工具了，使用它可以方便的生成CHANGELOG、打版本号和发布。

项目链接：[changesets](https://github.com/changesets/changesets)

我这有个[pnpm monorepo](https://github.com/taoliujun/npm-packages)库，现在在用`changesets`管理发布版本了。

## 安装

```shell
pnpm add -Dw @changesets/cli @changesets/changelog-git
```

`@changesets/cli`是必须安装的，`@changesets/changelog-git`是CHANGELOG生成风格，可以选择其他的，也可以不安装，用默认的。

## 初始化

```shell
pnpm changeset init
```

生成`.changeset`目录，里面有`config.json`，我修改了一下，如下：

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/changelog-git",
  // 在changeset add和changeset version后，自动运行git commit
  "commit": true,
  // 如果要发布到npm官方仓库，就设置成public
  "access": "public",
  // 我的仓库的主分支是master
  "baseBranch": "master",
  "fixed": [],
  "linked": [],
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

## 发布一个包

现在，我要给包pack1添加一些新特性，和修复一些bug。

特性代码有点长，我要写好几天的代码。仍然按照以往的commit message的频率和风格去提交代码。这个commit message里的type和subject，**都不会影响CHANGELOG和包版本号**。

### 随时添加一个changeset

当我完成一个特性，或修复了一个bug，可以随时打一个changeset标记，这样就可以记录下来，方便后面生成CHANGELOG。再次说明，这个changeset标记和commit message是互不冲突的，changeset标记是用来管理包版本的，而commit message是用来管理代码的。

*这和之前使用lerna有点区别，lerna是根据commit message来决定版本号和CHANGLOG的，而`changesets`是根据`changeset add`和`changeset version`来决定的。*

`changeset`这么做的目的是，让开发者将包管理和代码管理分开，这样更加灵活。

```base
// 添加一个changeset标记
pnpm changeset add
```

会出现交互，让你选择要打标记的包，版本号等。

#### 选版本遇到一个坑，总是显示`major`？？？

`changeset`老版本会让你上下选择版本类型，而新的`changeset`的交互改了，在提示`major`的时候，未选择的包，按回车后会进入到选择`minor`的步骤。

### 生成CHANGELOG和版本号

终于，我完成了所有的特性和bug，准备发布了。

可以查看`.changeset`下有很多`.md`文件，这些就是之前随时添加的changeset标记。每一个文件描述了改动的包、改动的类型、改动的内容。在下一步操作之前，可以直接修改这些`.md`文件，来修改上述提到的类型、内容等。

准备好了，运行

```shell
pnpm changeset version
```

changeset会生成CHANGELOG和版本号，在最终发布之前，最好查看一下。

### 发布

```
pnpm changeset publish
```

它会自动调用`pnpm publish`，发布到npm仓库，并且打上tag。不过可惜的是，要手动push tag到远程：`git push --tags`。



