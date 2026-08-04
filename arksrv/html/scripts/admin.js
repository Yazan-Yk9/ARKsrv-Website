// ==========================================================
// admin.js - سكربتات لوحة التحكم
// ==========================================================

// تبديل نموذج التعديل
function toggleEdit(id) {
    const el = document.getElementById('edit-' + id);
    if (el) {
        el.style.display = (el.style.display === 'none') ? 'block' : 'none';
    }
}

// معاينة Markdown فورية
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('preview-input');
    const output = document.getElementById('preview-output');
    
    if (input && output) {
        input.addEventListener('input', function() {
            output.innerHTML = marked.parse(this.value);
        });
        // تشغيل المعاينة الأولية
        output.innerHTML = marked.parse(input.value);
    }
});