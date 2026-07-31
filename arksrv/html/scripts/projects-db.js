// =========================================================================
// قاعدة بيانات المشاريع الفنية لمدير الأنظمة (تستطيع إضافة حتى 100 مشروع هنا)
// =========================================================================
const projectsDatabase = {
    "aapanel-vps": {
        title: "تثبيت وضبط لوحة تحكم aaPanel وتأمينها بالكامل على خادم VPS",
        htmlContent: `
            <p>تم في هذا المشروع تهيئة وإعداد خادم افتراضي خاص <code>VPS</code> من الصفر، وتحويله إلى بيئة استضافة متكاملة وآمنة لإدارة المواقع وقواعد البيانات بسهولة وبشكل مجاني تماماً دون الحاجة للوحات المدفوعة المكلفة مثل <code>cPanel</code>.</p>
            
            <h2><i class="fas fa-bullseye"></i> الهدف من المشروع</h2>
            <p>مساعدة العميل في إدارة الخادم والمواقع وقواعد البيانات والشهادات الرقمية عبر واجهة رسومية مرنة وسريعة بضغطة زر، بدلاً من سطور الأوامر المعقدة <code>CLI</code>، مع خفض تكاليف التراخيص الشهرية إلى 0$.</p>

            <h2><i class="fas fa-cogs"></i> الخطوات التنفيذية والتوثيق المرئي</h2>
            
            <h3><i class="fas fa-server"></i> 1. إعداد الخادم الرئيسي وحزمة الويب</h3>
            <p>تحديث حزم نظام التشغيل بالكامل وسد الثغرات الأمنية الأساسية، تلاها تنصيب حزمة العمل المتكاملة <code>LNMP</code> لضمان أعلى سرعة واستقرار لخادم الويب وقواعد البيانات.</p>
            <pre><code>sudo apt update && sudo apt upgrade -y</code></pre>

            <h3><i class="fas fa-shield-alt"></i> 2. إدارة النطاقات وتأمين الاتصال الرقمي (SSL)</h3>
            <p>ربط أسماء النطاقات وتوجيه السجلات بالشكل الصحيح داخل السيرفر، مع تفعيل شهادات الأمان الرقمية المجانية عبر منصة <code>Let's Encrypt</code> وتفعيل بروتوكول <code>Force HTTPS</code> الإجباري لحماية بيانات تسجيل الدخول.</p>
            <img src="img/aapanel-ssl.png" alt="قائمة شهادات الأمان والنطاقات المفعلة" class="img-fluid my-3 rounded shadow">

            <h3><i class="fas fa-lock"></i> 3. تصليد وحماية السيرفر (Server Hardening)</h3>
            <p>تغيير المنفذ الافتراضي للوحة <code>Port 8888</code> إلى منفذ مخصص وعشوائي لمنع هجمات الفحص العشوائي للـ <code>Port Scanning</code>، مع ضبط جدار حماية اللوحة ونظام التشغيل <code>Firewall</code> وتفعيل برمجية <code>Fail2ban</code> لحظر هجمات التخمين تلقائياً.</p>
            <img src="img/aapanel-security.png" alt="إعدادات الأمان وجدار الحماية في اللوحة" class="img-fluid my-3 rounded shadow">

            <h3><i class="fas fa-cloud-download-alt"></i> 4. نظام النسخ الاحتياطي المؤتمت (Automated Backups)</h3>
            <p>ربط الخادم بمساحة تخزين سحابية خارجية آمنة، مع برمجة وإعداد مهام مجدولة <code>Cron Jobs</code> لتقوم اللوحة بعمل نسخ احتياطي تلقائي ودوري للملفات وقواعد البيانات لحماية العميل من الفقدان الطارئ.</p>
            <img src="img/aapanel-backup.png" alt="صفحة جدولة المهام والنسخ الاحتياطي التلقائي" class="img-fluid my-3 rounded shadow">
        `
    },
    "docker-env": {
        title: "مشروع بناء وإدارة حاويات Docker معزولة للمواقع",
        htmlContent: `
            <p>تم إعداد بيئة عمل متكاملة باستخدام حاويات <code>Docker</code> معزولة لحماية التطبيقات من التداخل الفني.</p>
            <h2><i class="fas fa-terminal"></i> خطوات التشغيل والأتمتة</h2>
            <pre><code>docker compose up -d</code></pre>
            <img src="img/docker-dashboard.png" alt="Docker Dashboard" class="img-fluid my-3 rounded shadow">
        `
    }
    // لإضافة مشروع جديد (رقم 3، 4، ... 100)؛ تفتح فاصلة وتضيف كتلة جديدة بنفس المعايير هنا ببساطة.
};

// الدالة المسؤولة عن التقاط المعرّف (Hash) وعرض محتوى المشروع بدقة وتنسيق برمتفليو حقيقي
function renderActiveProject() {
    const projectId = window.location.hash.substring(1); 
    const titleElement = document.getElementById("project-title");
    const contentElement = document.getElementById("project-content");
    
    if (projectId && projectsDatabase[projectId]) {
        const project = projectsDatabase[projectId];
        document.title = project.title; // تحديث عنوان تبويب المتصفح باسم المشروع
        
        if (titleElement) titleElement.innerHTML = `<i class="fas fa-project-diagram text-info"></i> ` + project.title;
        if (contentElement) contentElement.innerHTML = project.htmlContent;
        
        // صعود تلقائي ناعم لأعلى الشاشة لضمان تصفح المشروع من بدايته
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        if (titleElement) titleElement.innerHTML = `<span><i class="fas fa-exclamation-triangle text-danger"></i> خطأ في الرابط</span>`;
        if (contentElement) {
            contentElement.innerHTML = `
                <div class="text-center my-4">
                    <p class="text-warning fw-bold">عذراً، لم يتم العثور على تفاصيل هذا المشروع في قاعدة البيانات.</p>
                    <a href="protofolio.html" class="btn btn-outline-info btn-sm mt-2"><i class="fas fa-arrow-right"></i> العودة لمعرض الأعمال الرئيسي</a>
                </div>
            `;
        }
    }
}

window.addEventListener('DOMContentLoaded', renderActiveProject);
window.addEventListener('hashchange', renderActiveProject);
