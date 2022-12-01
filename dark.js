/* ================================================== */
/* ================ DARK MODE SWITCH ================ */

if(sessionStorage.getItem('dark')=='true') {
    document.documentElement.classList.add('dark');
}

function toggleTheme() {
    if (sessionStorage.getItem('dark')=='true') {
        sessionStorage.setItem('dark', false)
    } else {
        sessionStorage.setItem('dark', true)
    };
    document.documentElement.classList.toggle('dark');
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyM') {
        e.preventDefault();
        toggleTheme()
    }
});