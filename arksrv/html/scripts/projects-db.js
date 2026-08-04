// projects-db.js - الإصدار الذي يتعامل مع ملف JSON الخارجي
let projectsDatabase = {};

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('فشل تحميل البيانات');
        projectsDatabase = await response.json();
        renderActiveProject(); // عرض المشروع بعد التحميل
    } catch (error) {
        console.error(error);
        document.getElementById('project-title').textContent = '⚠️ حدث خطأ في تحميل البيانات';
    }
}

function renderActiveProject() {
    const projectId = window.location.hash.substring(1);
    const titleElement = document.getElementById("project-title");
    const contentElement = document.getElementById("project-content");

    if (projectId && projectsDatabase[projectId]) {
        const project = projectsDatabase[projectId];
        document.title = project.title;
        titleElement.innerHTML = `<i class="fas fa-project-diagram text-info"></i> ${project.title}`;
        contentElement.innerHTML = marked.parse(project.markdown);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        titleElement.innerHTML = `<span><i class="fas fa-exclamation-triangle text-danger"></i> مشروع غير موجود</span>`;
        contentElement.innerHTML = `
            <div class="text-center my-4">
                <p class="text-warning fw-bold">عذراً، لم يتم العثور على هذا المشروع.</p>
                <a href="portfolio.html" class="btn btn-outline-info btn-sm mt-2"><i class="fas fa-arrow-right"></i> العودة لمعرض الأعمال</a>
            </div>
        `;
    }
}

// تشغيل التحميل عند فتح الصفحة
window.addEventListener('DOMContentLoaded', loadProjects);
window.addEventListener('hashchange', renderActiveProject);