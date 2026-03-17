// js/typewriter.js 完整代码
// 定义需要循环的文案列表（可自定义添加更多）
const texts = [
    "🥰欢迎来到我的个人网站",
    "用设计平衡美感与体验 · 让界面有温度"
];
// 配置项（可自定义时长）
const config = {
    typeSpeed: 100,    // 打字速度（毫秒/字符）
    deleteSpeed: 50,   // 删除速度（毫秒/字符）
    stayTime: 2000,    // 文案停留时间（毫秒）
    startDelay: 500    // 初始延迟（毫秒）
};

// 等待DOM加载完成后再执行（关键！避免找不到元素）
document.addEventListener('DOMContentLoaded', function () {
    const typewriterEl = document.getElementById('typewriter');
    const cursorEl = document.querySelector('.typewriter-cursor');
    let currentTextIndex = 0; // 当前显示的文案索引
    let currentCharIndex = 0; // 当前打字的字符索引
    let isDeleting = false;   // 是否处于删除阶段

    // 核心打字/删除函数
    function typeEffect() {
        const currentText = texts[currentTextIndex];

        // 打字阶段
        if (!isDeleting) {
            // 逐字拼接文字
            typewriterEl.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;

            // 打字完成 → 停留 → 准备删除
            if (currentCharIndex === currentText.length) {
                cursorEl.classList.remove('cursor-hidden');
                setTimeout(() => {
                    isDeleting = true;
                }, config.stayTime);
            }
        }
        // 删除阶段
        else {
            // 逐字删除文字
            typewriterEl.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            cursorEl.classList.add('cursor-hidden'); // 删除时隐藏光标

            // 删除完成 → 切换文案 → 准备打字
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length; // 循环切换文案
            }
        }

        // 控制动画速度（打字慢，删除快）
        const speed = isDeleting ? config.deleteSpeed : config.typeSpeed;
        // 递归调用，实现循环
        setTimeout(typeEffect, speed);
    }

    // 初始延迟后启动动画（匹配页面整体加载节奏）
    setTimeout(typeEffect, config.startDelay);
});