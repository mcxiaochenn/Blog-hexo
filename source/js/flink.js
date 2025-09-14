(function() {
    const STATUS_CACHE_KEY = "statusTagsData";
    const STATUS_JSON_URL = "https://check-flink.mcxiaochen.top/result.json";

    let latestData = [];

    // 渲染状态标签
    function addStatusTags(data) {
        if (!Array.isArray(data)) return;

        document.querySelectorAll(".flink-list-item").forEach(item => {
            // 防止重复添加
            if (item.querySelector(".status-tag")) return;

            // 获取显示名字
            const nameEl = item.querySelector(".flink-item-name, .cf-friends-name");
            if (!nameEl) return;
            const nameText = nameEl.textContent.trim();

            // 根据名字匹配 JSON 数据
            const status = data.find(s => s.name === nameText);
            if (!status) return;

            // 创建状态标签
            const tag = document.createElement("div");
            tag.classList.add("status-tag");

            let text = "未知";
            let colorClass = "status-tag-red";

            if (status.latency >= 0) {
                text = status.latency.toFixed(2) + " s";
                colorClass = status.latency <= 2 ? "status-tag-green"
                           : status.latency <= 5 ? "status-tag-light-yellow"
                           : status.latency <= 10 ? "status-tag-dark-yellow"
                           : "status-tag-red";
            }

            tag.textContent = text;
            tag.classList.add(colorClass);

            // 保证父容器相对定位
            item.style.position = "relative";
            item.appendChild(tag);
        });
    }

    // 获取 JSON 数据（带缓存）
    function fetchStatusData() {
        const cache = localStorage.getItem(STATUS_CACHE_KEY);
        if (cache) {
            try {
                const parsed = JSON.parse(cache);
                const cachedData = Array.isArray(parsed.data) ? parsed.data : (parsed.data?.link_status || []);
                if (Date.now() - new Date(parsed.timestamp).getTime() < 18e5) { // 30分钟有效
                    latestData = cachedData;
                    addStatusTags(latestData);
                }
            } catch (e) {
                console.warn("❌ 解析缓存失败，忽略缓存", e);
            }
        }

        fetch(`${STATUS_JSON_URL}?t=${Date.now()}`)
            .then(r => r.json())
            .then(json => {
                latestData = Array.isArray(json) ? json : (json.link_status || []);
                addStatusTags(latestData);
                localStorage.setItem(STATUS_CACHE_KEY, JSON.stringify({ data: latestData, timestamp: new Date().toISOString() }));
            })
            .catch(err => console.error("❌ 获取 result.json 出错:", err));
    }

    // 监听 DOM 变化，自动渲染新增卡片
    function observeNewItems() {
        const observer = new MutationObserver(() => addStatusTags(latestData));
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // 初始化
    document.addEventListener("DOMContentLoaded", () => {
        fetchStatusData();
        observeNewItems();
    });

    document.addEventListener("pjax:complete", () => {
        fetchStatusData();
    });
})();
