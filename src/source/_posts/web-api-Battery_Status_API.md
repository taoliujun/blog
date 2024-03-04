---
title: "Web API - Battery Status"
date: "2024-03-01T09:34:25Z"
categories:
  - [JavaScript]

url: web-api-Battery_Status_API
tags:
  - webapi
  - Battery Status

---


原文链接：[https://github.com/taoliujun/blog/issues/58](https://github.com/taoliujun/blog/issues/58)

<!--hexo
---
url: web-api-Battery_Status_API
tags:
  - webapi
  - Battery Status
---
-->

# Battery Status

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API

**Battery Status**可以查看电池信息、监听充电状态变化。

## 接口

### BatteryManager

设备电池对象。

## 方法

### getBattery

返回`Promise<BatteryManager>`

## 示例

示例：https://taoliujun.github.io/example/web-api/Battery_Status_API/index.html

1. 拔掉笔记本充电线，再插上充电线，可以看到监听到充电状态变化。

![image](https://github.com/taoliujun/blog/assets/5689134/9944f20b-95b2-4bc2-b2c6-01c7cdcdf80d)




