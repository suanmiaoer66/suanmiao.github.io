// 文章筛选功能
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleItems = document.querySelectorAll('.article-item');
  const animationDuration = 300; // 和CSS transition时长一致

  // 初始化：移除所有隐藏类，确保首次加载正常
  articleItems.forEach(item => {
    item.classList.remove('filter-hidden');
    item.style.opacity = '1';
    item.style.transform = 'translateZ(0)';
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 切换按钮active状态
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // 第一步：先让所有文章项执行淡出动画（不隐藏，避免布局瞬间变化）
      articleItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) translateZ(0)';
      });

      // 第二步：等待动画结束后，调整布局+执行淡入动画
      setTimeout(() => {
        articleItems.forEach(item => {
          const category = item.getAttribute('data-category');

          if (filter === '全部' || category === filter) {
            // 显示文章项：移除隐藏类 + 淡入动画
            item.classList.remove('filter-hidden');
            // 延迟一帧触发动画，避免布局重排冲突
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) translateZ(0)';
            }, 10);
          } else {
            // 隐藏文章项：添加隐藏类（display: none），完全脱离布局流
            item.classList.add('filter-hidden');
          }
        });
      }, animationDuration);
    });
  });
});