document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('projects-container');
    const loadingMsg = document.getElementById('loading-message');

    fetch('projects.json')
        .then(response => {
            if (!response.ok) throw new Error('فشل تحميل البيانات');
            return response.json();
        })
        .then(projects => {
            container.innerHTML = '';
            const projectArray = Object.entries(projects);
            
            if (projectArray.length === 0) {
                container.innerHTML = `
                    <div class="col-12 text-center text-white-50 py-5">
                        <i class="fas fa-code fa-3x mb-3" style="color:#818cf8;"></i>
                        <p class="fs-5">سيتم إضافة المشاريع قريباً...</p>
                        <p class="small text-white-50">ترقبوا المزيد من الحلول التقنية المميزة.</p>
                    </div>
                `;
                return;
            }

            projectArray.forEach(([id, project]) => {
                const tags = project.tech_tags ? project.tech_tags.split(',').map(t => t.trim()) : [];
                const icon = project.icon || 'fa-code';
                
                const card = document.createElement('div');
                card.className = 'col-md-6 col-lg-4';
                card.innerHTML = `
                    <div class="project-card">
                        <div>
                            <i class="fa-solid ${icon} project-icon"></i>
                            <h4 class="text-white fw-bold fs-5 mb-2">${project.title}</h4>
                            <p class="text-white-50 small">${project.short_desc || 'لم يتم إضافة وصف مختصر'}</p>
                            <div>
                                ${tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div class="text-start mt-3">
                            <a href="project.html#${id}" class="btn btn-sm btn-outline-light rounded-pill px-3">
                                <i class="fa-regular fa-eye me-1"></i> عرض التفاصيل
                            </a>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('خطأ:', error);
            container.innerHTML = `
                <div class="col-12 text-center text-white-50 py-5">
                    <i class="fas fa-exclamation-triangle fa-2x mb-3" style="color:#f59e0b;"></i>
                    <p>عذراً، لا يمكن عرض المشاريع حالياً.</p>
                    <p class="small text-white-50">يرجى المحاولة مرة أخرى لاحقاً.</p>
                </div>
            `;
        });
});