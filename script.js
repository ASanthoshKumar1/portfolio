document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const hero = document.getElementById('hero');
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.blinking-cursor');

    // --- NEW: Double-Loop Reveal Content ---
    const phases = [
        "SCAN. CODE. SECURE.",
        "B.Tech CSE: Where Java Meets Nmap."
    ];
    let phaseIndex = 0;
    let charIndex = 0;
    const typingSpeed = 70; // ms

    function type() {
        if (charIndex < phases[phaseIndex].length) {
            typingElement.textContent += phases[phaseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed); // Typing speed
        } else {
            // End of phase, start the next phase logic
            setTimeout(nextPhase, 1500); // Pause before next phase
        }
    }

    function nextPhase() {
        // Toggle phase index (0 becomes 1, 1 becomes 0)
        phaseIndex = (phaseIndex + 1) % phases.length;
        charIndex = 0;
        
        // Instant delete (slick reveal)
        typingElement.textContent = ''; 

        setTimeout(type, 50); // Start typing the next phrase quickly
    }

    // --- Project Filtering Logic ---
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Highlight Nav Link
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-nav'));
            this.classList.add('active-nav');
        });
    });

    // --- Initial Hero Animation (Fade-In) ---
    hero.style.opacity = 0; 
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease-in';
        hero.style.opacity = 1;
    }, 500);


    // --- Advanced Interactivity: Scroll Reveal Animation ---
    const sectionsToReveal = document.querySelectorAll('section:not(#hero)');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 
    });

    sectionsToReveal.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
    
    // --- START THE DOUBLE-LOOP TYPING ANIMATION ---
    setTimeout(type, 1000); 
});
