// js/title-change.js
(function () {
    // 保存原始标题
    const originalTitle = document.title;
    // 离开时的标题文案
    const leaveTitle = '😭你快回来';

    // 监听页面可见性变化
    function handleVisibilityChange() {
        document.title = document.hidden ? leaveTitle : originalTitle;
    }

    // 绑定事件（兼容所有现代浏览器）
    document.addEventListener('visibilitychange', handleVisibilityChange);
})();