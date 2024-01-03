---
title: "React公共状态利器 - Zustand"
date: "2023-12-13T06:46:26Z"
categories:
  - [React]

url: react-zustand
tags:
  - zustand
  - react store

---


原文链接：[https://github.com/taoliujun/blog/issues/35](https://github.com/taoliujun/blog/issues/35)

<!--hexo
---
url: react-zustand
tags:
  - zustand
  - react store
---
-->

官方文档：https://docs.pmnd.rs/zustand

# 如何使用

**Zustand** 是一个非常简单粗暴的全局状态管理库，它的使用有多简单呢？如下：

```bash
> pnpm add zustand
```

```ts
// useFormStateStore.ts
import { create } from 'zustand';

interface State {
    loading: boolean;
    disabled: boolean;
    setLoadingByAge: (value: number) => void;
}

export const useFormStateStore = create<State>((set) => ({
    loading: false,
    disabled: false,
    setLoadingByAge: (value) => {
        set({ loading: value > 10 });
    },
}));
```

```tsx
// app.tsx
import { useState, type FC } from 'react';
import { useFormStateStore } from './useFormStateStore';
import { Button } from '@/components/Button';

const Loading: FC = () => {
    const { loading } = useFormStateStore();
    return <div>loading: {String(loading)}</div>;
};

const Disabled: FC = () => {
    const { disabled } = useFormStateStore();
    return <div>disabled: {String(disabled)}</div>;
};

const Main: FC = () => {
    const { setLoadingByAge } = useFormStateStore();
    const [age, setAge] = useState(0);

    return (
        <div>
            <Loading />
            <br />
            <Disabled />
            <br />
            <Button
                onClick={() => {
                    useFormStateStore.setState({
                        loading: true,
                    });
                }}
            >
                set loading true
            </Button>
            <Button
                onClick={() => {
                    useFormStateStore.setState({
                        loading: false,
                    });
                }}
            >
                set loading false
            </Button>
            <Button
                onClick={() => {
                    useFormStateStore.setState({
                        disabled: true,
                    });
                }}
            >
                set disabled true
            </Button>
            <Button
                onClick={() => {
                    useFormStateStore.setState({
                        disabled: false,
                    });
                }}
            >
                set disabled false
            </Button>
            <br />
            <input
                type="number"
                value={age}
                onChange={(e) => {
                    setAge(Number(e.target.value));
                }}
            />
            <br />
            <Button
                onClick={() => {
                    setLoadingByAge(age);
                }}
            >
                set loading by age
            </Button>
        </div>
    );
};

export default Main;
```

在`useFormStateStore.ts`中定义了状态，然后在`app.tsx`中使用，就是这么简单粗暴！这里有几点介绍下：

- 对于简单的状态更新，使用`setState`方法就可以，它的参数是一个对象，这个对象就是你要更新的状态，它会和之前的状态进行合并，然后返回一个新的状态，从而触发组件更新。

- 对于需要通用的逻辑处理的状态更新，参照`useFormStateStore.ts`中的`setLoadingByAge`方法，将它作为状态里的一个方法就行了。

# Zustand

使用非常简单，API也很少，它的原理是使用了`Proxy`，所以它的性能非常好。

# 相比Redux

相比Redux，Zustand的代码非常简单明了，不需要使用`connect`、`mapStateToProps`、`mapDispatchToProps`这些方法。

# 相比React Context

React Context需要一个`Provider`包裹组件以传递状态，需要一个`useContext`使用状态，光从层级上就让人绕起来了。而Zustand只需要一个`create`方法，就可以使用了，且状态是全局的，不需要传递。




