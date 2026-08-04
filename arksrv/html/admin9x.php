<?php
// =============================================
// لوحة تحكم إدارة المشاريع - ARKsrv
// =============================================

// 🔐 تم تعطيل كلمة المرور النصية والاعتماد على Auth Basic الخاص بـ Nginx
$admin_password = ''; // قيمة فارغة لتعطيل المصادقة النصية

// تحديد مسار ملف JSON
$jsonFile = 'projects.json';

// جلب البيانات الحالية
function getProjects() {
    global $jsonFile;
    if (!file_exists($jsonFile)) {
        file_put_contents($jsonFile, json_encode([]));
    }
    $data = file_get_contents($jsonFile);
    return json_decode($data, true);
}

// حفظ البيانات
function saveProjects($data) {
    global $jsonFile;
    file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// معالجة الطلبات (إضافة - تعديل - حذف)
$projects = getProjects();
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // إضافة مشروع جديد
    if (isset($_POST['action']) && $_POST['action'] === 'add') {
        $id = trim($_POST['id']);
        $title = trim($_POST['title']);
        $markdown = trim($_POST['markdown']);
        $icon = trim($_POST['icon'] ?? 'fa-code');
        $short_desc = trim($_POST['short_desc'] ?? '');
        $tech_tags = trim($_POST['tech_tags'] ?? '');
        
        if (!empty($id) && !empty($title) && !empty($markdown)) {
            $id = preg_replace('/[^a-zA-Z0-9\-]/', '-', strtolower($id));
            $projects[$id] = [
                'title' => $title,
                'markdown' => $markdown,
                'icon' => $icon,
                'short_desc' => $short_desc,
                'tech_tags' => $tech_tags
            ];
            saveProjects($projects);
            $message = '<div class="alert alert-success">✅ تم إضافة المشروع بنجاح!</div>';
        } else {
            $message = '<div class="alert alert-danger">❌ جميع الحقول مطلوبة!</div>';
        }
    }
    
    // حذف مشروع
    if (isset($_POST['action']) && $_POST['action'] === 'delete') {
        $id = $_POST['id'];
        if (isset($projects[$id])) {
            unset($projects[$id]);
            saveProjects($projects);
            $message = '<div class="alert alert-warning">🗑️ تم حذف المشروع!</div>';
        }
    }
    
    // تعديل مشروع
    if (isset($_POST['action']) && $_POST['action'] === 'edit') {
        $id = $_POST['id'];
        $title = trim($_POST['title']);
        $markdown = trim($_POST['markdown']);
        $icon = trim($_POST['icon'] ?? 'fa-code');
        $short_desc = trim($_POST['short_desc'] ?? '');
        $tech_tags = trim($_POST['tech_tags'] ?? '');
        
        if (isset($projects[$id]) && !empty($title) && !empty($markdown)) {
            $projects[$id] = [
                'title' => $title,
                'markdown' => $markdown,
                'icon' => $icon,
                'short_desc' => $short_desc,
                'tech_tags' => $tech_tags
            ];
            saveProjects($projects);
            $message = '<div class="alert alert-info">✏️ تم تحديث المشروع!</div>';
        }
    }
    
    $projects = getProjects();
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>لوحة تحكم ARKsrv - إدارة المشاريع</title>
    
    <link rel="stylesheet" href="./assets/font-awesome/css/all.min.css">
    <link rel="stylesheet" href="./assets/bootstrap/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="./assets/fonts/cairo.css">
    <link rel="stylesheet" href="./styles/style.css">
    <!-- ✅ تنسيقات خاصة بلوحة التحكم (منفصلة) -->
    <link rel="stylesheet" href="./styles/admin.css">
</head>
<body>
    <div class="container py-5">
        <div class="text-center mb-4">
            <h1 class="fw-bold text-white"><i class="fa-brands fa-linux text-primary"></i> ARK<span class="text-primary">srv</span> <small class="fs-6 text-white-50">لوحة تحكم المدير</small></h1>
            <p class="text-white-50">إضافة وتعديل وحذف المشاريع في ملف <code>projects.json</code></p>
            <a href="index.html" class="btn btn-outline-light btn-sm mt-2"><i class="fas fa-home"></i> العودة للموقع</a>
        </div>

        <?php if ($message) echo $message; ?>

        <!-- ===== نموذج إضافة مشروع جديد ===== -->
        <div class="admin-card">
            <h2><i class="fas fa-plus-circle"></i> إضافة مشروع جديد</h2>
            <form method="POST">
                <input type="hidden" name="action" value="add">
                <div class="row g-3">
                    <div class="col-md-3">
                        <label class="form-label text-white-50">المعرّف (ID)</label>
                        <input type="text" name="id" class="form-control" placeholder="مثال: my-new-project" required>
                        <small class="text-white-50">أحرف إنجليزية صغيرة وشرطات فقط</small>
                    </div>
                    <div class="col-md-9">
                        <label class="form-label text-white-50">العنوان</label>
                        <input type="text" name="title" class="form-control" placeholder="عنوان المشروع" required>
                    </div>
                    
                    <!-- ===== الحقول الجديدة للبطاقة ===== -->
                    <div class="col-md-4">
                        <label class="form-label text-white-50">أيقونة البطاقة (Icon)</label>
                        <input type="text" name="icon" class="form-control" placeholder="مثال: fa-server" value="fa-code">
                        <small class="text-white-50">من <a href="https://fontawesome.com/icons" target="_blank" style="color:#818cf8;">Font Awesome</a></small>
                    </div>
                    <div class="col-md-8">
                        <label class="form-label text-white-50">الوصف المختصر</label>
                        <input type="text" name="short_desc" class="form-control" placeholder="وصف قصير يظهر في البطاقة" required>
                    </div>
                    <div class="col-12">
                        <label class="form-label text-white-50">الوسوم التقنية (افصل بينها بفاصلة)</label>
                        <input type="text" name="tech_tags" class="form-control" placeholder="مثال: Docker, Nginx, Linux">
                    </div>
                    
                    <div class="col-12">
                        <label class="form-label text-white-50">المحتوى (Markdown)</label>
                        <textarea name="markdown" class="form-control code-editor" rows="8" placeholder="اكتب محتوى المشروع بصيغة Markdown..." required></textarea>
                        <small class="text-white-50">يدعم Markdown العادي (عناوين، أكواد، قوائم).</small>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary px-5"><i class="fas fa-save"></i> حفظ المشروع</button>
                    </div>
                </div>
            </form>
        </div>

        <!-- ===== قائمة المشاريع الحالية ===== -->
        <div class="admin-card">
            <h2><i class="fas fa-list"></i> المشاريع الحالية (<?php echo count($projects); ?>)</h2>
            
            <?php if (empty($projects)): ?>
                <p class="text-white-50">لا يوجد مشاريع مضافة بعد. أضف مشروعك الأول الآن!</p>
            <?php else: ?>
                <?php foreach ($projects as $id => $project): ?>
                <div class="project-item">
                    <div class="d-flex align-items-center flex-wrap">
                        <span class="id-badge">#<?php echo $id; ?></span>
                        <span class="title-text"><?php echo htmlspecialchars($project['title']); ?></span>
                    </div>
                    <div class="d-flex gap-2 mt-2 mt-sm-0">
                        <button class="btn btn-warning btn-sm" onclick="toggleEdit('<?php echo $id; ?>')"><i class="fas fa-edit"></i> تعديل</button>
                        <form method="POST" onsubmit="return confirm('هل أنت متأكد من حذف هذا المشروع؟')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?php echo $id; ?>">
                            <button type="submit" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> حذف</button>
                        </form>
                    </div>
                </div>
                
                <!-- نموذج التعديل المخفي -->
                <div id="edit-<?php echo $id; ?>" style="display: none; margin-bottom: 15px; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
                    <form method="POST">
                        <input type="hidden" name="action" value="edit">
                        <input type="hidden" name="id" value="<?php echo $id; ?>">
                        <div class="row g-3">
                            <div class="col-12">
                                <label class="form-label text-white-50">العنوان</label>
                                <input type="text" name="title" class="form-control" value="<?php echo htmlspecialchars($project['title']); ?>" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label text-white-50">أيقونة البطاقة (Icon)</label>
                                <input type="text" name="icon" class="form-control" value="<?php echo htmlspecialchars($project['icon'] ?? 'fa-code'); ?>">
                            </div>
                            <div class="col-md-8">
                                <label class="form-label text-white-50">الوصف المختصر</label>
                                <input type="text" name="short_desc" class="form-control" value="<?php echo htmlspecialchars($project['short_desc'] ?? ''); ?>" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label text-white-50">الوسوم التقنية (افصل بينها بفاصلة)</label>
                                <input type="text" name="tech_tags" class="form-control" value="<?php echo htmlspecialchars($project['tech_tags'] ?? ''); ?>">
                            </div>
                            <div class="col-12">
                                <label class="form-label text-white-50">المحتوى (Markdown)</label>
                                <textarea name="markdown" class="form-control code-editor" rows="6" required><?php echo htmlspecialchars($project['markdown']); ?></textarea>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary"><i class="fas fa-check"></i> تحديث</button>
                                <button type="button" class="btn btn-secondary" onclick="toggleEdit('<?php echo $id; ?>')">إلغاء</button>
                            </div>
                        </div>
                    </form>
                </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <!-- معاينة سريعة -->
        <div class="admin-card">
            <h2><i class="fas fa-eye"></i> معاينة سريعة (للاختبار)</h2>
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label text-white-50">ضع النص هنا</label>
                    <textarea id="preview-input" class="form-control code-editor" rows="5"># عنوان رئيسي

## عنوان فرعي
- نقطة 1
- نقطة 2

`كود صغير`</textarea>
                </div>
                <div class="col-md-6">
                    <label class="form-label text-white-50">المعاينة</label>
                    <div id="preview-output" class="preview-box"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="./assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="./assets/font-awesome/js/all.min.js"></script>
    <!-- ✅ سكربتات لوحة التحكم (منفصلة) -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="./scripts/admin.js"></script>
</body>
</html>
