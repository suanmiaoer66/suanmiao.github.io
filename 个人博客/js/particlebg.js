// 获取画布和上下文
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸为容器大小
function resizeCanvas() {
    const heroSection = document.querySelector('.hero-section');
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
}

// 初始化尺寸
resizeCanvas();
// 窗口大小变化时重新调整
window.addEventListener('resize', resizeCanvas);

// 粒子类（点点状，无尾巴）
class Particle {
    constructor() {
        // 初始位置：x随机，y在容器底部
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;

        // 中等的点点大小
        this.size = Math.random() * 2 + 1;

        // 移动速度：向上稍快，左右偏移小
        this.speedY = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.6 - 0.3;

        // 透明度和消失速度
        this.alpha = 1;
        this.decay = Math.random() * 0.005 + 0.001;

        // 粒子颜色适配你的深色背景（淡绿色系，和你的00ff88呼应）
        this.color = `rgba(0, 255, 136, ${this.alpha})`;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.alpha -= this.decay;
        this.color = `rgba(0, 255, 136, ${this.alpha})`;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// 粒子数组
let particles = [];
const createParticleFrequency = 8;
let frameCount = 0;

// 动画循环
function animate() {
    // 清空画布（用透明色，因为你的背景有渐变和图片）
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 定期创建新粒子
    frameCount++;
    if (frameCount % createParticleFrequency === 0) {
        particles.push(new Particle());
    }

    // 更新并绘制所有粒子
    particles = particles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.alpha > 0;
    });

    requestAnimationFrame(animate);
}

// 启动动画
animate();