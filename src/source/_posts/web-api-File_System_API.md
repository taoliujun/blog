---
title: "Web API - File System"
date: "2024-03-13T07:07:49Z"
categories:
  - [Web API]

url: web-api-File_System_API
tags:
  - webapi
  - File System

---


原文链接：[https://github.com/taoliujun/blog/issues/86](https://github.com/taoliujun/blog/issues/86)

<!--hexo

---
url: web-api-File_System_API
tags:
  - webapi
  - File System
---

-->

# File System

> MDN: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API

**File System**可读取、写入用户选择的文件、目录。

> 和`File`的交互有所不同，本API不依赖`<input type="file" />`元素。

## OPFS(origin private file system) Concept

以往，只能读取、写入用户手动选择的文件或目录，这是安全性上必须考虑的。但如果要批量写入很多文件，这些交互操作会频繁且耗时。OPFS提供了新的可能性，允许在私有域文件系统中直接操作文件，这个文件系统和用户的文件系统是隔离的，用户看不到它，它也不能访问用户的文件系统。

对于用户选择的文件，也可以通过`createSyncAccessHandle()`授权为`OPFS`。

-   OPFS在Web Worker中运行。
-   OPFS就像是`Storage`、`IndexedDB`。
-   清空浏览器的Storage，也会清除掉OPFS。

## 接口

### FileSystemHandle

文件系统的基本接口，开发者不直接使用它。文件和目录的访问接口均继承于此。其中一部分属性、方法：

-   `kind`，文件类型是file或directory。
-   `name`，文件名。
-   `queryPermission()`，查询操作的授权。
-   `requestPermission()`，请求操作的授权。

### FileSystemFileHandle

访问文件的接口。除继承`FileSystemHandle`的属性方法，还有：

-   `getFile()`，获取到文件对象。
-   `createWritable()`，请求写入权限，返回`FileSystemWritableFileStream`。
-   `createSyncAccessHandle()`，返回当前文件句柄的OPFS。

### FileSystemDirectoryHandle

访问目录的接口。除继承`FileSystemHandle`的属性方法，还有：

-   `getDirectoryHandle()`，获取到指定名称的子目录对象。
-   `getFileHandle()`，获取指定名称的文件对象。
-   `removeEntry()`，移除指定名称的子目录或文件。
-   迭代器`entries`、`keys`、`values`用于遍历目录内的条目。

### FileSystemSyncAccessHandle

访问OPFS的接口。部分属性方法有：

-   `close`，释放句柄，禁止继续操作。
-   `flush`，将写入的数据，保存到磁盘里。
-   `write`，写入数据。
-   `read`，读取数据。

### FileSystemWritableFileStream

写入文件的接口。部分属性方法有：

-   `write`，写入数据。
-   `close`，关闭且保存到磁盘。

## 属性和方法

### window.showOpenFilePicker(options)

选择可读取文件的对话框，返回`FileSystemFileHandle`。

入参支持多选文件、目录入口、目录定位、类型筛选等。

### window.showSaveFilePicker()

选择可写入文件的对话框，返回`FileSystemFileHandle`。该接口实例已经拥有了写入权限。

### window.showDirectoryPicker()

选择可读取目录的对话框，返回`FileSystemDirectoryHandle`。

### DataTransferItem.getAsFileSystemHandle()

拖拽文件或目录，返回`FileSystemFileHandle`或`FileSystemDirectoryHandle`。

### StorageManager.getDirectory()

通过`navigator.storage.getDirectory()`返回`OPFS`。

## 示例

示例：https://taoliujun.github.io/example/web-api/File_System_API/index.html




