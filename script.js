document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const hero = document.getElementById('hero');
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.blinking-cursor');

    // --- FINAL: Double-Loop Reveal Content (Tamil & Professional) ---
    const phases = [
        "யாதும் ஊரே யாவரும் கேளிர்" , // Tamil Tagline
        "Encrypting dreams and debugging nightmares.." // Professional Tagline
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
            // Pause before starting the next phase
            setTimeout(nextPhase, 2000); // Pause for 2 seconds
        }
    }

    function nextPhase() {
        // Toggle phase index (0 -> 1, 1 -> 0)
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
                    // Set display to block for visible cards
                    card.style.display = 'flex'; 
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
            const targetEl = document.querySelector(targetId);
            
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Highlight Nav Link
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-nav'));
            this.classList.add('active-nav');
        });
    });

    // --- Initial Hero Animation (Fade-In) ---
    if (hero) {
        hero.style.opacity = 0;
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease-in';
            hero.style.opacity = 1;
        }, 500);
    }

    // --- Advanced Interactivity: Scroll Reveal Animation ---
    const sectionsToReveal = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the CSS class to start the animation 
                entry.target.classList.add('is-visible');
                // Stop observing once visible
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sectionsToReveal.forEach(section => {
        // Apply initial hidden state (CSS must define '.section-hidden')
        section.classList.add('section-hidden');
        observer.observe(section);
    });
    
    // --- START THE DOUBLE-LOOP TYPING ANIMATION ---
    if (typingElement) {
        setTimeout(type, 1000); // Start after 1 second
    }
});
