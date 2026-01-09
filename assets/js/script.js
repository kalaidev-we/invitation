document.addEventListener('DOMContentLoaded', () => {

    // --- Audio Control ---
    const audio = document.getElementById('bg-music');
    const audioBtn = document.getElementById('audio-toggle');
    const btnIcon = audioBtn.querySelector('i');
    let hasInteracted = false;

    // Initially hide button or show muted state
    audioBtn.classList.remove('hidden');

    // Attempt Autoplay on Load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            btnIcon.classList.remove('ri-volume-mute-line');
            btnIcon.classList.add('ri-music-fill');
        }).catch(error => {
            console.log("Autoplay prevented by browser. Waiting for interaction.");
        });
    }

    function toggleAudio() {
        if (audio.paused) {
            audio.play().then(() => {
                btnIcon.classList.remove('ri-volume-mute-line');
                btnIcon.classList.add('ri-music-fill');
            }).catch(e => console.log("Audio play failed", e));
        } else {
            audio.pause();
            btnIcon.classList.remove('ri-music-fill');
            btnIcon.classList.add('ri-volume-mute-line');
        }
    }

    audioBtn.addEventListener('click', toggleAudio);

    // --- Language Toggle ---
    const langBtn = document.getElementById('lang-toggle');
    const langText = langBtn.querySelector('.lang-text');

    // Check saved preference or default to English
    let currentLang = localStorage.getItem('site-lang') || 'en';
    applyLanguage(currentLang);

    function applyLanguage(lang) {
        document.body.setAttribute('data-lang', lang);
        langText.textContent = lang === 'en' ? 'தமிழ்' : 'ENGLISH'; // Show what you can switch TO
        localStorage.setItem('site-lang', lang);
    }

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ta' : 'en';
        applyLanguage(currentLang);
    });

    // Auto-attempt play on first interaction (click/scroll) if not playing
    document.addEventListener('click', () => {
        if (!hasInteracted) {
            hasInteracted = true;
            // Optional: Auto play on first click
            // audio.play().catch(() => {});
            // Update Icon
            // btnIcon.classList.remove('ri-volume-mute-line');
            // btnIcon.classList.add('ri-music-fill');
        }
    }, { once: true });


    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
                obs.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-bottom');
    animatedElements.forEach(el => observer.observe(el));


    // --- Parallax Effect for Footer ---
    /* Simple parallax on scroll */
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const footerBg = document.querySelector('.footer-bg');
        // Check if footer is roughly visible to optimize
        // For simplicity, we just apply a small translate based on scroll
        // if(footerBg) {
        //   footerBg.style.transform = `translateY(${scrolled * 0.1}px)`;
        // }
    });

    // --- Door Opening Logic ---
    // --- Door Opening Logic ---
    const doorOverlay = document.getElementById('door-overlay');
    const enterBtn = document.getElementById('enter-btn');
    // langBtn and audioBtn are already defined at the top

    // No longer hiding controls initially. They are now z-index 10000.

    enterBtn.addEventListener('click', () => {
        // 1. Open Doors
        doorOverlay.classList.add('doors-open');

        // 2. Play Audio (User interaction allows this!)
        if (audio.paused) {
            audio.play().then(() => {
                btnIcon.classList.remove('ri-volume-mute-line');
                btnIcon.classList.add('ri-music-fill');
            }).catch(e => console.log("Audio play failed", e));
        }

        // 3. Play Video (Ensure it's playing)
        const video = document.querySelector('.hero-video');
        if (video) video.play();

        // 4. Reveal Controls after animation (1.5s) - NO OP now
        setTimeout(() => {
            // doorOverlay.style.display = 'none'; // Optional: remove from flow
        }, 1500);
    });

    console.log("Invitation scripts loaded.");
});
