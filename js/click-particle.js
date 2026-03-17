// click-particle.js - 鼠标拖尾+点击爆炸效果（性能优化版）
(function () {
    // 创建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '9999';
    document.body.appendChild(particleContainer);

    // 配置项（可自定义）
    const config = {
        // 拖尾粒子参数
        trailParticleCount: 3, // 每次移动生成的粒子数（越少越轻量）
        trailParticleSize: 4,  // 拖尾粒子大小
        trailSpeed: 0.5,       // 拖尾粒子扩散速度
        trailLifetime: 600,    // 拖尾粒子存活时间（ms）
        trailSpread: 8,        // 拖尾粒子扩散范围
        // 点击爆炸参数
        clickParticleCount: 15,
        clickParticleSize: 6,
        clickSpreadRange: 15,
        clickLifetime: 800,
        // 通用颜色（适配你的主题）
        colors: ['#00ff88', '#00aaff', '#ffffff', '#17171c'],
        // 性能优化：鼠标移动触发间隔（ms）
        moveThrottle: 10
    };

    // 存储活跃的拖尾粒子（用于清理，避免内存泄漏）
    let activeTrailParticles = [];
    let lastMoveTime = 0;

    // 监听鼠标移动（生成拖尾）
    document.addEventListener('mousemove', function (e) {
        const now = Date.now();
        // 节流：控制粒子生成频率，减少性能消耗
        if (now - lastMoveTime < config.moveThrottle) return;
        lastMoveTime = now;

        // 生成一组拖尾粒子
        for (let i = 0; i < config.trailParticleCount; i++) {
            createTrailParticle(e.clientX, e.clientY);
        }

        // 清理过期粒子（避免DOM节点过多）
        activeTrailParticles = activeTrailParticles.filter(particle => {
            if (Date.now() - particle.createTime > config.trailLifetime) {
                particleContainer.removeChild(particle.el);
                return false;
            }
            return true;
        });
    });

    // 监听鼠标点击（爆炸效果）
    document.addEventListener('click', function (e) {
        for (let i = 0; i < config.clickParticleCount; i++) {
            createClickParticle(e.clientX, e.clientY);
        }
    });

    // 创建拖尾粒子（核心：拖尾效果）
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        // 随机样式
        const size = Math.random() * config.trailParticleSize + 2;
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const angle = Math.random() * Math.PI * 2; // 随机扩散方向
        const offset = Math.random() * config.trailSpread; // 随机扩散距离

        // 粒子基础样式
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;
        particle.style.opacity = '0.9';
        // 渐变动画：扩散+透明+消失
        particle.style.transition = `all ${config.trailLifetime / 1000}s ease-out`;

        // 添加到容器和活跃列表
        particleContainer.appendChild(particle);
        activeTrailParticles.push({
            el: particle,
            createTime: Date.now()
        });

        // 触发拖尾动画（轻微扩散+淡出）
        setTimeout(() => {
            const dx = Math.cos(angle) * offset * config.trailSpeed;
            const dy = Math.sin(angle) * offset * config.trailSpeed;
            particle.style.transform = `translate(${dx}px, ${dy}px)`;
            particle.style.opacity = '0';
        }, 10);
    }

    // 创建点击爆炸粒子（保留原有效果）
    function createClickParticle(x, y) {
        const particle = document.createElement('div');
        const size = Math.random() * config.clickParticleSize + 2;
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;

        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;
        particle.style.opacity = '1';
        particle.style.transition = `all ${config.clickLifetime / 1000}s ease-out`;

        particleContainer.appendChild(particle);

        setTimeout(() => {
            const dx = Math.cos(angle) * speed * config.clickSpreadRange;
            const dy = Math.sin(angle) * speed * config.clickSpreadRange;
            particle.style.transform = `translate(${dx}px, ${dy}px)`;
            particle.style.opacity = '0';
        }, 10);

        // 自动清理爆炸粒子
        setTimeout(() => {
            particleContainer.removeChild(particle);
        }, config.clickLifetime);
    }
})();