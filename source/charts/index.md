---
title: 统计
date: 2025-07-17 21:51:35
type: "charts"
comments: false
aside: false
---

<script src="https://cdn.bootcdn.net/ajax/libs/echarts/4.9.0-rc.1/echarts.min.js"></script>

<!-- 文章发布时间统计图 --> <!-- 2024-09是从2024年9月开始计算 -->
<div id="posts-chart" data-start="2024-09" style="border-radius: 8px; height: 300px; padding: 10px;"></div>
<!-- 文章标签统计图 --> <!-- data-length="10" 是显示的标签数量 -->
<div id="tags-chart" data-length="10" style="border-radius: 8px; height: 300px; padding: 10px;"></div>
<!-- 文章分类统计图 -->
<div id="categories-chart" data-parent="true" style="border-radius: 8px; height: 300px; padding: 10px;"></div>