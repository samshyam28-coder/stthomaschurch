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

        // Check if this button actually has a dropdown menu next to it
        const content = button.nextElementSibling;
        const hasDropdown = content && content.classList.contains('dropdown-content');

        if ((isMobileWidth || isTouchDevice) && hasDropdown) {
            // ONLY prevent default if there is a dropdown to open
            e.preventDefault();
            
            const isAlreadyOpen = content.classList.contains('open');

            // Close ALL other dropdowns
            allDropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });

            // Toggle this one
            if (!isAlreadyOpen) {
                content.classList.add('open');
            }
        }
        // If there's no dropdown (like your Home link), the browser will 
        // follow the link normally!
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









// --- Education Ministry Flipbook Logic (Fixed Version) ---
document.addEventListener('DOMContentLoaded', () => {
    // We move these inside so they only look for elements when the page is ready
    const mainImg = document.getElementById('mainPage');
    const thumbBox = document.getElementById('thumbStrip');
    const counter = document.getElementById('pageCounter');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // !!! THE GUARD !!! 
    // If 'mainPage' isn't found, it stops here and doesn't break the menu.
    if (!mainImg) return; 

    const totalPages = 35;
    let current = 1;

    // 1. Generate Thumbnails
    if (thumbBox) {
        thumbBox.innerHTML = ''; 
        for (let i = 1; i <= totalPages; i++) {
            const t = document.createElement('img');
            t.src = `images/education/${i}.jpg`;
            t.classList.add('thumb');
            if (i === 1) t.classList.add('active');
            t.onclick = () => window.jumpToPage(i);
            thumbBox.appendChild(t);
        }
    }

    // 2. The Jump Function
    window.jumpToPage = function(n) {
        if (n < 1 || n > totalPages || !mainImg) return;
        current = n;

        mainImg.classList.remove('flip-animation');
        void mainImg.offsetWidth; 
        mainImg.classList.add('flip-animation');

        mainImg.src = `images/education/${current}.jpg`;
        
        if (counter) counter.innerText = current;

        document.querySelectorAll('.thumb').forEach((thumb, index) => {
            thumb.classList.toggle('active', index + 1 === current);
        });
    };

    // 3. Button Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            window.jumpToPage(current + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            window.jumpToPage(current - 1);
        });
    }
});
