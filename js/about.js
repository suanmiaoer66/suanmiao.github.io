// Copy to clipboard functionality
document.addEventListener('DOMContentLoaded', () => {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const copyToast = document.getElementById('copyToast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const textToCopy = btn.getAttribute('data-copy');
      
      // Copy to clipboard
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show toast
        copyToast.classList.add('show');
        
        // Change icon temporarily
        const icon = btn.querySelector('.copy-icon');
        const originalIcon = icon.textContent;
        icon.textContent = '✓';
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyToast.classList.remove('show');
          icon.textContent = originalIcon;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });
  });

  // Skill stars animation
  const skillStars = document.querySelectorAll('.star.filled');
  
  const starObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, index * 50);
      }
    });
  }, { threshold: 0.5 });

  skillStars.forEach(star => {
    star.style.opacity = '0';
    star.style.transform = 'scale(0)';
    star.style.transition = 'all 0.3s ease';
    starObserver.observe(star);
  });
});
