---
title: "Web API - Geolocation"
date: "2024-03-15T05:48:21Z"
categories:
  - [Web API]

url: web-api-Geolocation_API
tags:
  - webapi
  - Geolocation

---


原文链接：[https://github.com/taoliujun/blog/issues/88](https://github.com/taoliujun/blog/issues/88)

<!--hexo

---
url: web-api-Geolocation_API
tags:
  - webapi
  - Geolocation
---

-->

# Geolocation

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

**Geolocation**获取设备的地理位置信息，包括了纬度、经度、海拔、经纬度的精度范围（米）、海拔的精度范围（米），以及设备的面朝方位度数和速度。

## 接口

### Geolocation

地理定位接口，提供了几个方法：

-   `getCurrentPosition` 获取地理定位信息，返回`GeolocationPosition`。
-   `watchPosition` 监听地理定位信息，返回`GeolocationPosition`。
-   `clearWatch` 停止监听。

### GeolocationCoordinates

定位信息，包含经纬度等。

### GeolocationPosition

定位信息，包含`timestamp`和`GeolocationCoordinates`。

### GeolocationPositionError

定位异常信息，如用户拒绝，定位超时。

## 属性和方法

### Navigator.geolocation

返回`Geolocation`。

## 示例

示例：https://taoliujun.github.io/example/web-api/Geolocation_API/index.html

1. 打印位置信息。

![image](https://github.com/taoliujun/blog/assets/5689134/0eee3be8-2880-406a-acc9-0b5c50512fc8)




