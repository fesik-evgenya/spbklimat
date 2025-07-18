 document.getElementById('fileInput').addEventListener('change', function(e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : 'Файл не выбран';
    document.getElementById('fileName').textContent = fileName;
})