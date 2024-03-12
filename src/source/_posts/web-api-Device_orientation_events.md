---
title: "Web API - Device Orientation"
date: "2024-03-12T06:31:13Z"
categories:
  - [Web API]

url: web-api-Device_orientation_events
tags:
  - webapi
  - Device Orientation

---


原文链接：[https://github.com/taoliujun/blog/issues/81](https://github.com/taoliujun/blog/issues/81)

<!--hexo

---
url: web-api-Device_orientation_events
tags:
  - webapi
  - Device Orientation
---

-->

# Device Orientation

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events

**Device Orientation**用于获取设备的方向、和运动信息。移动设备的加速度传感器、陀螺仪、指南针等组件为浏览器提供了一系列运动信息，可以监听事件获取到相关信息。

> 三轴指的是手机沿着北方向竖向平放在桌子上，左右是X轴，上下是Y轴，高低是Z轴。

## 接口

下面的接口里的数据概念有所类似但又有细节差异，使用时仔细参考官方文档。

### DeviceMotionEvent

设备的加速度和旋转速率的变化事件。包含以下信息：

-   `acceleration`，加速度，不包括重力计算。
-   `accelerationIncludingGravity`，加速度，包括重力计算。
-   `interval`，获取数据的频率，单位毫秒。
-   `rotationRate`，三个轴上的速率。

### DeviceMotionEventAcceleration

设备在三个轴上的加速度量的变化事件。包含以下信息：

-   `z`，Z轴变化量。
-   `x`，X轴变化量。
-   `y`，Y轴变化量。

### DeviceMotionEventRotationRate

设备在三个轴的旋转速率的变化事件。包含以下信息：

-   `alpha`，Z轴速率，即每秒变化量。
-   `beta`，X轴速率。
-   `gamma`，Y轴速率。

### DeviceOrientationEvent

设备物理方向的变化事件。包含了以下信息：

-   `absolute`，数据信息是否是绝对量（地球坐标）。
-   `alpha`，Z轴变化量。
-   `beta`，X轴变化量。
-   `gamma`，Y轴变化量。

## 方法和属性

### Event.devicemotion

事件监听，返回`DeviceMotionEvent`。

### Event.deviceorientation

事件监听，返回`DeviceOrientationEvent`

### Event.deviceorientationabsolute

事件监听，返回`DeviceOrientationEvent`

## 示例

示例：https://taoliujun.github.io/example/web-api/Device_orientation_events/index.html




