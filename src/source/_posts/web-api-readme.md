---
title: "Web API 实践，最后更新2024/02月..."
date: "2024-02-28T08:10:53Z"
categories:
  - [Web API]

url: web-api-readme
tags:
  - webapi

---


原文链接：[https://github.com/taoliujun/blog/issues/49](https://github.com/taoliujun/blog/issues/49)

<!--hexo
---
url: web-api-readme
tags:
  - webapi
---
-->

[Web API](https://www.w3.org/TR/)的发展日新月异，稍不留神就偷偷的出了新规范，这些规范为项目方案提供了更多的可能性。话说读百遍不如写一遍，计划在一段时间内，对大部分API进行demo实践以加深印象。

> 以 https://developer.mozilla.org/en-US/docs/Web/API 为基础，只实践W3C Recommendation状态的API。

## 目录

### A

- [ ] [Audio Output Devices API](https://developer.mozilla.org/en-US/docs/Web/API/Audio_Output_Devices_API) 选择音频播放设备。*Experimental*

### B

- [ ] [Background Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Fetch_API) 在后台下载大文件。*Experimental*
- [ ] [Background Sync](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API) 延迟任务以便在网络稳定时运行。*Experimental*
- [x] #55，[Background Tasks](https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API) 利用空闲时间跑阻塞的任务。
- [x] #50，[Badging API](https://developer.mozilla.org/en-US/docs/Web/API/Badging_API) 在web App中设置图标徽章。
- [ ] [Barcode Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API)，读取图片流中的条码、二维码。*Experimental*
- [x] #58，[Battery API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API) 获取设备电池状态。
- [x] #53，[Beacon](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) 发送无需响应的请求，保证浏览器关闭之前发送完毕。
- [ ] [Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) 连接蓝牙。*Experimental*
- [x] #59，[Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) 跨标签、窗口通信。

### C

- [ ] [CSS Counter Styles](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Counter_Styles) 为CSS定义计数器。
- [x] #63，[CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API) 设置元素的高亮区域。
- [x] #65，[CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API) 字体加载管理。
- [ ] [CSS Painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API) 为CSS的背景等属性提供自定义的图片绘制。*Experimental*
- [x] #67，[CSS Properties and Values API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API) 为CSS扩展属性，类似`CSS variables`。
- [x] #69，[CSS Typed Object Model API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API) 提供了一系列访问和操作CSS值的方法。
- [x] #71，[CSSOM](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) 管理CSS的方法合集，类似DOM。
- [ ] [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 画图。  
- [ ] [Channel Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API) 又一种跨窗口通信。
- [x] #72，[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) 访问、写入系统剪切板。
- [ ] [Compression Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API) 使用`gzip`、`deflate`压缩数据流。 
- [ ] [Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console_API) 控制台日志输出。
- [ ] [Contact Picker API](https://developer.mozilla.org/en-US/docs/Web/API/Contact_Picker_API) 选择设备上的联系人。*Experimental*
- [ ] [Content Index API](https://developer.mozilla.org/en-US/docs/Web/API/Content_Index_API) 设置`service worker`的离线数据。*Experimental*
- [x] #75，[Cookie Store API](https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API) 优雅的管理cookie。
- [x] #77，[Credential Management API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API) 管理登录凭证。

### D

- [x] #80，[DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) 元素操作的方法合集。
- [x] #79，[Device Memory API](https://developer.mozilla.org/en-US/docs/Web/API/Device_Memory_API) 访问设备可用内存大小。
- [x] #81，[Device Orientation Events](https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events) 访问设备的物理方向。
- [x] #82，[Document Picture-in-Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API) 画中画。*experimental*

### E

- [ ] [EditContext API](https://developer.mozilla.org/en-US/docs/Web/API/EditContext_API) 富文本交互 *Experimental*
- [ ] [Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API) 字符编码解码
- [ ] [Encrypted Media Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API) 支持数字版权内容
- [x] #84，[EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API) 颜色吸管 *Experimental*

### F

- [ ] [FedCM API](https://developer.mozilla.org/en-US/docs/Web/API/FedCM_API) *Experimental*
- [ ] [Fenced Frame API](https://developer.mozilla.org/en-US/docs/Web/API/Fenced_frame_API) *Experimental*
- [ ] [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 发起网络请求，代替XMLHttpRequest
- [x] #85，[File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API) 访问用户选择的文件
- [x] #86，[File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API) 访问、写入操作系统上的文件
- [ ] [File and Directory Entries API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API) 虚拟文件系统
- [ ] [Force Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Force_Touch_events) Non-standard
- [x] #87，[Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) 元素全屏

### G

- [ ] [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) 访问手柄设备
- [x] #88，[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)  访问地理位置
- [ ] [Geometry Interfaces](https://developer.mozilla.org/en-US/docs/Web/API/Geometry_interfaces) 几何形状



