---
title: "Web API - Credential Management"
date: "2024-03-08T05:51:27Z"
categories:
  - [JavaScript]

url: web-api-Credential_Management_API
tags:
  - webapi
  - Credential Management

---


原文链接：[https://github.com/taoliujun/blog/issues/77](https://github.com/taoliujun/blog/issues/77)

<!--hexo

---
url: web-api-Credential_Management_API
tags:
  - webapi
  - Credential Management
---

-->

# Credential Management

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API

**Credential Management**用于管理网页的登录凭证如如密码、秘钥对。比如在第一次登录时保存密码凭证，以后读取该凭证后自动登录，省去用户重复输入账号密码的步骤（尽管可能还需要用户在浏览器弹出框里选择要登录的用户）。

在一些浏览器如chrome的Password Manager配置`chrome://password-manager/settings`中，有一个选项**Offer to save passwords**：

![image](https://github.com/taoliujun/blog/assets/5689134/11785f82-c37c-450a-9711-a46cf2eb6346)

是否允许保存密码。它在打开后，有两个作用，一是允许代码调用`credentials.store`存储凭证信息；二是允许浏览器智能的为你存储网页的登录凭证，即便该网页并未显式调用`credentials.store`。它的效果如下：

![image](https://github.com/taoliujun/blog/assets/5689134/3469d848-16cc-4439-871a-5d574d1ab34f)

## 接口

### Credential

基础凭证接口，本身不能直接使用。

### PasswordCredential

密码凭证接口，继承于`Credential`，用于存储、读取密码类型的凭证。

### FederatedCredential

联合凭证接口，比如接入google联合登录凭证。

### CredentialsContainer

`Navigator.credentials`获取该接口实例，提供`create`、`get`、`store`等方法来创建、读取、存储凭证。`create`接口一般不直接使用，而直接用`PasswordCredential`这种具体的接口去创建凭证。

## 方法和属性

略，见示例。

## 示例

示例：https://taoliujun.github.io/example/web-api/Credential_Management_API/index.html

1. 输入账号密码，点击登录，提示是否存储密码凭证：

![image](https://github.com/taoliujun/blog/assets/5689134/9b476376-3c0e-4467-b42b-5d8685186839)

2. 读取密码凭证并打印：

![image](https://github.com/taoliujun/blog/assets/5689134/69de9bd3-08eb-4f67-91e7-86f1c94d16f9)

3. 如果有多个凭证，需要用户手动选择使用哪个凭证：

![image](https://github.com/taoliujun/blog/assets/5689134/9b4859ba-0ebe-4f3f-945a-50f654e78ee9)




