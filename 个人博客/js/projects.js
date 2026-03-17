// Projects filter functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const animationDuration = 300; // 和CSS transition时长一致

  // 初始化：移除所有隐藏类，确保首次加载正常
  projectCards.forEach(card => {
    card.classList.remove('filter-hidden');
    card.style.opacity = '1';
    card.style.transform = 'translateZ(0)';
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 切换按钮active状态
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // 第一步：先让所有卡片执行淡出动画（不隐藏，避免布局瞬间变化）
      projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) translateZ(0)';
      });

      // 第二步：等待动画结束后，调整布局+执行淡入动画
      setTimeout(() => {
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');

          if (filter === '全部' || category === filter) {
            // 显示卡片：移除隐藏类 + 淡入动画
            card.classList.remove('filter-hidden');
            // 延迟一帧触发动画，避免布局重排冲突
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) translateZ(0)';
            }, 10);
          } else {
            // 隐藏卡片：添加隐藏类（display: none），完全脱离布局流
            card.classList.add('filter-hidden');
          }
        });
      }, animationDuration);
    });
  });
});