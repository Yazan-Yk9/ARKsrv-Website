# 📘 ARKsrv - Linux Server Management Solution


### 🚀 نبذة عن المشروع
**ARKsrv** هو نظام متكامل لإدارة المشاريع التقنية الخاصة بخوادم Linux، صُمم ليعرض خدماتك وحلولك التقنية بطريقة احترافية. يشمل الموقع:
- صفحة رئيسية تعريفية.
- صفحة خدمات مفصلة.
- معرض مشاريع (Portfolio) ديناميكي.
- لوحة تحكم (Admin Panel) لإدارة المشاريع عبر `projects.json`.

### ✨ الميزات الرئيسية
- **عرض المشاريع ديناميكياً**: بطاقات مشاريع تُقرأ من ملف `projects.json`.
- **لوحة تحكم سهلة**: إضافة، تعديل، وحذف المشاريع مع حقول (الأيقونة، الوصف، الوسوم، المحتوى Markdown).
- **تصميم متجاوب (RTL)**: يدعم اللغة العربية بالكامل مع Bootstrap 5.
- **أداء محسّن**: استخدام خطوط محلية، ضغط Gzip، وتخزين مؤقت للملفات الثابتة.
- **صفحة 404 مخصصة**: صفحة خطأ جذابة مع روابط سريعة.
- **أمان**: حماية لوحة التحكم عبر Nginx Proxy Manager (Auth Basic).

### 🗂️ هيكل الملفات
```text
arksrv/
├── html/
│   ├── index.html
│   ├── services.html
│   ├── portfolio.html
│   ├── project.html
│   ├── 404.html
│   ├── admin9x.php          # لوحة التحكم
│   ├── projects.json        # قاعدة البيانات
│   ├── styel.css
│   ├── admin.css
│   ├── script.js
│   ├── portfolio.js
│   ├── admin.js
│   └── assets/
│       ├── fonts/           # خطوط Cairo المحلية
│       ├── font-awesome/    # Font Awesome (مجلدات css, js, webfonts)
│       └── bootstrap/       # Bootstrap محلي
└── nginx-conf/
    └── default.conf         # إعدادات Nginx للموقع
```

### ⚙️ التقنيات المستخدمة
| التقنية | الغرض |
| :--- | :--- |
| **HTML5, CSS3, JavaScript** | هيكل وتفاعل الموقع |
| **Bootstrap 5 (RTL)** | تصميم متجاوب وجاهز |
| **Font Awesome 6** | أيقونات احترافية |
| **PHP 8.2** | تشغيل لوحة التحكم |
| **Markdown** | كتابة محتوى المشاريع |
| **Docker** | بيئة تشغيل معزولة (Nginx + PHP-FPM) |
| **Nginx Proxy Manager** | بوابة رئيسية وإدارة SSL |

### 🛠️ كيف تشغل المشروع؟

#### المتطلبات المسبقة
- Docker و Docker Compose.
- خادم VPS أو بيئة محلية مع `docker-compose`.

#### خطوات التشغيل
```bash
# 1. استنساخ المستودع
git clone https://github.com/your-username/arksrv.git
cd arksrv

# 2. إنشاء المجلدات المطلوبة
mkdir -p arksrv/html arksrv/nginx-conf npm-data

# 3. نسخ ملفات الموقع إلى arksrv/html

# 4. تشغيل الحاويات
docker-compose up -d
```
### إعداد Nginx Proxy Manager

1. افتح `http://YOUR_IP:81` (البيانات الافتراضية: `admin@example.com` / `changeme`).
2. أضف Proxy Host جديد:
   - **Domain**: `example.com`
   - **Forward Hostname**: `arksrv_website`
   - **Forward Port**: `80`
3. فعّل SSL عبر Let's Encrypt.
4. في علامة **Advanced**، أضف كود حماية `admin9x.php`:

```nginx
location ~ /admin9x\.php$ {
    auth_basic "ARKsrv Admin - Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://arksrv_website:80;
}
```
### التوسع المستقبلي

- دعم مواقع متعددة عبر حاويات منفصلة.
- نظام مراقبة (Monitoring) لوضع السيرفرات.
- واجهة API لإدارة المحتوى عن بُعد.
