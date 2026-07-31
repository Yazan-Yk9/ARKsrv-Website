// 1. تحديث السنة تلقائياً في الفوتر
document.addEventListener("DOMContentLoaded", function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// 2. تفعيل التنقل السلس والناعم للروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                const navbarCollapse = document.getElementById('navbarNav');
                if(navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        }
    });
});

// 3. تأثير ذكي على القائمة العلوية عند التمرير للأسفل
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#0f172a';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = '#1e293b';
            navbar.style.boxShadow = 'none';
        }
    }
});
