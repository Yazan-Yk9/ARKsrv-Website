function toggleEdit(id) {
    const el = document.getElementById('edit-' + id);
    if (el) {
        el.style.display = (el.style.display === 'none') ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('preview-input');
    const output = document.getElementById('preview-output');
    
    if (input && output) {
        input.addEventListener('input', function() {
            output.innerHTML = marked.parse(this.value);
        });
        output.innerHTML = marked.parse(input.value);
    }
});