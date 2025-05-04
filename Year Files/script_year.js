function toggleSubjects(branch) {
    var subjects = document.getElementById(branch + "-subjects");
    subjects.style.display = (subjects.style.display === 'none' || subjects.style.display === '') ? 'block' : 'none';
}

function openPDF(pdfFileName) {
    window.open(pdfFileName, '_blank');
}