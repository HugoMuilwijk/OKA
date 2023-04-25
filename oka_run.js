// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// ▄██████▄ ██   ██ ▄█████▄         ██████▄ ██    ██ ███    ██         ██ ▄██████
// ██    ██ ██  ██  ██   ██         ██   ██ ██    ██ ████   ██         ██ ██
// ██    ██ █████   ███████         ██████  ██    ██ ██ ██  ██         ██ ▀█████▄
// ██    ██ ██  ██  ██   ██         ██   ██ ██    ██ ██  ██ ██    ██   ██      ██
// ▀██████▀ ██   ██ ██   ██ ███████ ██   ██ ▀██████▀ ██   ████ ██ ▀█████▀ ██████▀
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

// ▄▄▄▄ ╔════════════════════╗
// ████ ║ LANGUAGE VARIABLES ║
// ▀▀▀▀ ╚════════════════════╝

// All language used in the user interface of OKA. If Dutch is set as the browser
// language - this will be used, otherwise it will default to English.

if (navigator.language == 'nl') {
    var TXT_ScrollToTop     = 'Naar het begin van de pagina gescrolled';
    var TXT_DarkModeTitle   = 'Donker thema';
    var TXT_DarkModeText    = 'Donker thema actief';
    var TXT_LightModeTitle  = 'Licht thema';
    var TXT_LightModeText   = 'Licht thema actief';
    var TXT_FontLargeTitle  = 'Tekst groter';
    var TXT_FontLargeText   = 'Tekst groter ingesteld';
    var TXT_FontSmallTitle  = 'Tekst kleiner';
    var TXT_FontSmallText   = 'Tekst kleiner ingesteld';
    var TXT_CodeCopy        = 'HTML code gekopieerd naar klembord';
    var TXT_ImageAlt        = 'Leeg';
} else {
    var TXT_ScrollToTop     = 'Scrolled to the start of the page';
    var TXT_DarkModeTitle   = 'Dark mode';
    var TXT_DarkModeText    = 'Dark mode activated';
    var TXT_LightModeTitle  = 'Light mode';
    var TXT_LightModeText   = 'Light mode activated';
    var TXT_FontLargeTitle  = 'Larger font';
    var TXT_FontLargeText   = 'Larger font activated';
    var TXT_FontSmallTitle  = 'Smaller font';
    var TXT_FontSmallText   = 'Smaller font activated';
    var TXT_CodeCopy        = 'HTML code copied to clipboard';
    var TXT_ImageAlt        = 'Empty';
};

// ▄▄▄▄ ╔═════════════════╗
// ████ ║ SESSION STORAGE ║
// ▀▀▀▀ ╚═════════════════╝

// Boolean values not supported in sessionStorage, so string is used.
if(sessionStorage.getItem('dark')=='true') {
    document.documentElement.classList.add('dark');
}

if(sessionStorage.getItem('zoom')=='true') {
    document.documentElement.classList.add('zoom');
}

// ▄▄▄▄ ╔════════════════╗
// ████ ║ BASE FUNCTIONS ║
// ▀▀▀▀ ╚════════════════╝

// Basic throttle function, usefull for lightweight scroll callback.
function throttle (callback, limit) {
    var wait = false;
    return function () {
        if (!wait) {
            callback.apply(null, arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    }
}

// ▄▄▄▄ ╔═════════════╗
// ████ ║ SHOW SCROLL ║
// ▀▀▀▀ ╚═════════════╝

// Shows scroll-top-top button if document height is at least twice the
// viewport height and if scrolled passed the second halve of the page.
window.addEventListener('scroll', throttle(function(event) {
    var viewport_height = document.documentElement.clientHeight;
    var document_height = document.documentElement.scrollHeight;
    var scroll_position = document.documentElement.scrollTop;
    var menuScroll = document.getElementById('menu-scroll');
    if(document_height > 2*viewport_height && scroll_position > document_height/2){
        menuScroll.classList.add('oka-show');
    } else {
        menuScroll.classList.remove('oka-show');
    };
}, 250));

// ▄▄▄▄ ╔═══════════════╗
// ████ ║ SCROLL TO TOP ║
// ▀▀▀▀ ╚═══════════════╝

// Scrolls to the top of the page and hides the scroll-to-top button after
// a short delay.
function scrollToTop() {
    document.documentElement.scroll({ top: 0, left: 0, behavior: 'smooth' });
    buildToast(TXT_ScrollToTop);
    setTimeout(function() {
        var menuScroll = document.getElementById('menu-scroll');
        menuScroll.classList.remove('oka-show');
    }, 250);
}

// ▄▄▄▄ ╔══════════════════╗
// ████ ║ TOGGLE DARK MODE ║
// ▀▀▀▀ ╚══════════════════╝

// Toggles dark mode on page and sets the correct labels in menu and toast.
function toggleDarkMode() {
    var optionDark = document.getElementById('option-dark');
    if (sessionStorage.getItem('dark')=='true') {
        sessionStorage.setItem('dark', 'false')
        optionDark.innerText = TXT_DarkModeTitle;
        buildToast(TXT_LightModeText);
    } else {
        sessionStorage.setItem('dark', 'true')
        optionDark.innerText = TXT_LightModeTitle;
        buildToast(TXT_DarkModeText);
    };
    document.documentElement.classList.toggle('dark');
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyM') {
        e.preventDefault();
        toggleDarkMode()
    }
});

// ▄▄▄▄ ╔══════════════════╗
// ████ ║ TOGGLE FONT ZOOM ║
// ▀▀▀▀ ╚══════════════════╝

// Toggles font zoom on page and sets the correct labels in menu and toast.
function toggleFontZoom() {
    var optionZoom = document.getElementById('option-zoom');
    if (sessionStorage.getItem('zoom')=='true') {
        sessionStorage.setItem('zoom', 'false')
        optionZoom.innerText = TXT_FontLargeTitle;
        buildToast(TXT_FontSmallText);
    } else {
        sessionStorage.setItem('zoom', 'true')
        optionZoom.innerText = TXT_FontSmallTitle;
        buildToast(TXT_FontLargeText);
    };

    var viewport_height = document.documentElement.clientHeight;
    var document_height = document.documentElement.scrollHeight;
    var scroll_position = document.documentElement.scrollTop;

    // align_middle is used to get the scroll position closest to the original position
    var align_middle = scroll_position + (viewport_height / 2)

    // when close to the bottom of the page font zooming snaps to bottom for better experience
    var factor = 1 / document_height * align_middle ;
    if (factor >.95) {
        factor = 1;
    };

    document.documentElement.classList.toggle('zoom');

    // recalculate document height after adding or removing zoom to page
    var document_height = document.documentElement.scrollHeight;
    var scroll_result = document_height * factor - (viewport_height / 2);
    document.documentElement.scrollTo(0, scroll_result);
    checkHorizontalScroll();
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyZ') {
        e.preventDefault();
        toggleFontZoom()
    }
});

// ▄▄▄▄ ╔══════════════╗
// ████ ║ FIND IN PAGE ║
// ▀▀▀▀ ╚══════════════╝

function toggleFind() {
    if (navigator.language == 'nl') {
        buildModal('NL');
    } else {
        buildModal('EN');
    };
}

function toggleMenu() {
    const menuButton = document.getElementById('menu-button');
    menuButton.classList.toggle('oka-active');
}

function closeMenu() {
    const menuButton = document.getElementById('menu-button');
    menuButton.classList.remove('oka-active');
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyF') {
        e.preventDefault();
        buildModal('Use in page searching');
    }
});