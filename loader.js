// js/loader.js - 仅首次显示加载动画的独立脚本
document.addEventListener('DOMContentLoaded', function () {
    // 1. 获取首次访问标记和DOM元素
    const isFirstVisit = localStorage.getItem('isFirstVisit') !== 'false';
    const loader = document.getElementById('earth-loader');
    const progressBar = document.querySelector('.progress-bar-inner');

    // 2. 非首次访问：直接隐藏加载动画
    if (!isFirstVisit && loader) {
        loader.classList.add('loader-hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600); // 匹配loader.css的transition时长
        return; // 终止后续逻辑
    }

    // 3. 首次访问：执行你原有的平滑进度条加载逻辑
    if (isFirstVisit && loader && progressBar) {
        window.addEventListener('load', function () {
            let progress = 0;
            // 保留你原有的随机进度动画
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    progressBar.style.width = '100%';
                    clearInterval(interval);

                    // 进度完成后延迟隐藏
                    setTimeout(() => {
                        loader.classList.add('loader-hidden');
                        // 标记为非首次访问
                        localStorage.setItem('isFirstVisit', 'false');
                    }, 600);
                } else {
                    progressBar.style.width = progress + '%';
                }
            }, 150);
        });
    }
});