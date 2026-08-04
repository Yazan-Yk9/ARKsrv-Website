// ===== 1. تحديث السنة تلقائياً =====
document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// ===== 2. التنقل السلس وإغلاق القائمة في الجوال =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const collapse = document.getElementById('navbarNav');
            if (collapse && collapse.classList.contains('show')) {
                collapse.classList.remove('show');
            }
        }
    });
});

// ===== 3. تأثير النافبار عند التمرير (محسّن بالأداء) =====
let ticking = false;
window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.backgroundColor = '#0f172a';
                    navbar.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.3)';
                } else {
                    navbar.style.backgroundColor = '#1e293b';
                    navbar.style.boxShadow = 'none';
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});