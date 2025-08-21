---
title: 为使用anzhiyu主题的博客加上十年之约进度条
abbrlink: 7b47
summary: >-
  这里是小尘AI，这篇文章介绍了如何为使用anzhiyu主题的博客添加十年之约进度条功能。
date: 2025-08-18 17:03:33
tags:
  - 教程
  - 博客
  - 实战
categories:
  - 教程
  - 博客
cover: https://bu.dusays.com/2025/08/18/68a2eed3562dc.webp
---

## 前言

我从选择anzhiyu主题后大多搭建教程都是看的 **Mo佬** 的[这篇文章](https://blog.xiowo.net/posts/anzhiyu/)，查找资料的同时自然少不了 ~~偷窥~~（观摩）大佬的站点。其中他个人页的十年之约进度条可让我眼馋很久，如今博客稳定下来了，我自然要把它 ~~抄~~（借鉴）过来。

## 查找资料

秉持着能 {% kbd Ctrl %} + {% kbd C %} {% kbd V %} 就决不手搓的原则，我开始网上冲浪。经过一翻寻找，找到了 **GB大佬** 的这篇文章：

{% link 如何移植 Solitude 主题中的十年之约进度条至 anzhiyu 主题,GB,https://blog.gbfun.cc/posts/5498433.html %}

## 开始缝合

如今万事具备只欠动手了，我啪的一下很快就照着教程改完了，然后不出意外自然就要出意外了，三连运行hexo服务后？？？擦，这咋全是报错，我人傻了，丢给ai也没找到有用的线索，于是开始学pug语法，经过1小时的学习后我找到了问题所在——

往``anzhiyu>layout>includes>page>about.pug``塞 **进度函数** 这一步，少了一行``script.``，导致函数被误认为模板语法，加上之后三连运行，果然一切顺利！

## 修bug

主要就是缺少了``script.``，加上就没问题了，以下是修改后的代码，可以正常运行

代码已经缩进好了，搜索第一行直接粘贴即可

```PUG
!= page.content

      // ✅ 添加 Tenyear 模块
      if tenyear
        .author-content#tenyear
          .create-site-post.author-content-item.single
            .author-content-item-tips= tenyear.tips
            .author-content-item-title= tenyear.title
            p= tenyear.text
            .tenyear-timeline
              .progress
              .past-time
              .percentage-label
            .time-labels
              .start-time#tenyear-start-time= new Date(tenyear.start).toLocaleDateString()
              .end-time#tenyear-end-time= new Date(tenyear.end).toLocaleDateString()

        script.
          // ✅ 十年之约进度函数
          function updateTenYearProgress() {
            let progressElement = document.querySelector(".progress");
            let pastTimeElement = document.querySelector(".past-time");
            let percentageLabelElement = document.querySelector(".percentage-label");
            let startTimeElement = document.getElementById("tenyear-start-time");
            let endTimeElement = document.getElementById("tenyear-end-time");

            if (!startTimeElement || !endTimeElement) return;

            let startTime = new Date(startTimeElement.textContent).getTime();
            let endTime = new Date(endTimeElement.textContent).getTime();
            const currentTime = new Date().getTime();
            const progress = ((currentTime - startTime) / (endTime - startTime) * 100);
            const progressPercentage = Math.min(progress, 100) + "%";

            pastTimeElement.style.setProperty("--past-time-percentage", progress + "%");
            progressElement.style.setProperty("--progress-percentage", progressPercentage);

            if (progress > 5) {
              percentageLabelElement.textContent = `${progress.toFixed(0)}%`;
              percentageLabelElement.style.left = `calc(${progress}% - 35px)`;
            }

            percentageLabelElement.style.visibility = "visible";
          }

          if (document.getElementById("tenyear")) {
            updateTenYearProgress();
          }
```

## 最后效果

{% note info flat %}我建站时间过短，导致进度文本还显示不出来，实际上是有进度文字的 {% endnote %}

![成品图](https://bu.dusays.com/2025/08/18/68a2f4555be8f.png)

## 参考资料（排名不分先后）
- https://blog.gbfun.cc/posts/5498433.html
- https://kianexus.com/posts/211933561f8d/index.html