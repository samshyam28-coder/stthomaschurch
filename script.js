const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');
const allDropdowns = document.querySelectorAll('.dropdown-content');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');

    // FRESH MENU RESET: Closes all dropdowns when you close the main menu
    if (!menu.classList.contains('is-active')) {
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
});

// Optimized Dropdown click logic
document.querySelectorAll('.dropbtn').forEach(button => {
    button.addEventListener('click', (e) => {
        const isMobileWidth = window.innerWidth <= 768;
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

        if (isMobileWidth || isTouchDevice) {
            e.preventDefault();
            const content = button.nextElementSibling;
            
            // 1. Check if the one we clicked is ALREADY open
            const isAlreadyOpen = content.classList.contains('open');

            // 2. Close ALL dropdowns first (cleans the slate)
            allDropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });

            // 3. ONLY open it if it wasn't already open
            // If it was open, it stays closed now (Toggle Effect)
            if (!isAlreadyOpen) {
                content.classList.add('open');
            }
        }
    });
});



var swiper = new Swiper(".mainSwiper", {
    effect: "fade",
    fadeEffect: {
        crossFade: true // Fixes the "bleeding" overlap issue from your screenshot
    },
    loop: true,
    speed: 1000, // Makes the transition feel more premium/royal
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    // These two ensure the mobile height is always calculated correctly
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
});





function updateClock() {
    const now = new Date();
    
    // Format Date: e.g., Tuesday, March 3, 2026
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = now.toLocaleDateString(undefined, dateOptions);

    // Format Time: 09:01:10 AM
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    
    const timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    document.getElementById('live-clock').innerText = timeString;
}

setInterval(updateClock, 1000);
updateClock(); // Run immediately






function switchLang(lang) {
    // 1. Handle the Buttons (Shadow/Underline)
    const buttons = document.querySelectorAll('.hist-lang-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 2. Handle the Text Visibility
    const allTexts = document.querySelectorAll('.hist-desc-text');
    
    // First, hide every single description
    allTexts.forEach(text => text.classList.remove('active'));

    if (lang === 'en') {
        buttons[0].classList.add('active'); // Light up English button
        // Show only English descriptions
        document.querySelectorAll('.lang-en').forEach(t => t.classList.add('active'));
    } else {
        buttons[1].classList.add('active'); // Light up Malayalam button
        // Show only Malayalam descriptions
        document.querySelectorAll('.lang-ml').forEach(t => t.classList.add('active'));
    }
}
