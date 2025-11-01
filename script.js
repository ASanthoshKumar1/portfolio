document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const hero = document.getElementById('hero');

    // --- Project Filtering Logic (Interactive Element) ---
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Glitch text effect is now primarily handled by CSS on hover/active states,
            // but the class toggle below can be used for extra effects if defined in CSS.

            // Update active state of buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Show/Hide project cards based on category
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

    // --- Smooth Scrolling for Navigation (Enhances UX) ---
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Highlight Nav Link on Click
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-nav'));
            this.classList.add('active-nav');
        });
    });

    // --- Initial Hero Animation (Fade-In) ---
    // Hides the hero section initially in JS before the CSS animation starts
    hero.style.opacity = 0; 
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease-in';
        hero.style.opacity = 1;
    }, 500);


    // --- Advanced Interactivity: Scroll Reveal Animation ---
    // Elements will fade/slide in as they enter the viewport.
    const sectionsToReveal = document.querySelectorAll('section:not(#hero)');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the CSS class to start the animation (defined in style.css)
                entry.target.classList.add('is-visible');
                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options: Trigger when 10% of the section is visible
        threshold: 0.1 
    });

    sectionsToReveal.forEach(section => {
        // Apply initial hidden state (CSS must define '.section-hidden')
        section.classList.add('section-hidden');
        observer.observe(section);
    });

});
