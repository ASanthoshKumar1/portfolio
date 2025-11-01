document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // --- Project Filtering Logic (Interactive Element) ---
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
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
        });
    });

    // --- Simple Hero Animation on Load ---
    const hero = document.getElementById('hero');
    hero.style.opacity = 0;
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease-in';
        hero.style.opacity = 1;
    }, 500);
});