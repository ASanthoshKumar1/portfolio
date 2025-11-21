document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const hero = document.getElementById('hero');
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.blinking-cursor');

    // --- Double-Loop Reveal Content (Tamil & Cybersecurity) ---
    const phases = [
        "யாதும் ஊரே யாவரும் கேளிர்", // Tamil Tagline
        "Threat detection. Incident response. Secure by design." // Cybersecurity Tagline
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
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
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
                // Add the CSS class to start the animation (defined in style.css)
                entry.target.classList.add('is-visible');
                
                // Staggered animation for skill groups
                if (entry.target.id === 'skills') {
                    const skillGroups = entry.target.querySelectorAll('.skill-group');
                    skillGroups.forEach((group, index) => {
                        group.style.animationDelay = `${index * 0.2}s`;
                        group.classList.add('fade-in-up');
                    });
                }
                
                // Staggered animation for project cards
                if (entry.target.id === 'projects') {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.classList.add('fade-in-up');
                    });
                }
                
                // Stop observing once visible
                observer.unobserve(entry.target);
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
    setTimeout(type, 1000); // Start after 1 second

    // --- Enhanced Contact Section Animations ---
    function initContactAnimations() {
        const contactSection = document.getElementById('contact');
        const contactCards = document.querySelectorAll('.contact-card');
        const formElements = document.querySelectorAll('.form-group');
        const socialItems = document.querySelectorAll('.social-item');

        // Initialize AOS-like animations
        function initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.getAttribute('data-aos-delay') || 0;
                        setTimeout(() => {
                            entry.target.classList.add('aos-animate');
                        }, parseInt(delay));
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('[data-aos]').forEach(el => {
                observer.observe(el);
            });
        }

        // Enhanced form interactions
        function initFormAnimations() {
            const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
            
            formInputs.forEach(input => {
                // Add floating label functionality
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });

                // Check initial values
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });

            // Form submission animation
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const submitBtn = this.querySelector('.cyber-submit-btn');
                    const btnText = submitBtn.querySelector('.btn-text');
                    const btnLoader = submitBtn.querySelector('.btn-loader');
                    
                    // Show loading state
                    btnText.style.display = 'none';
                    btnLoader.style.display = 'block';
                    
                    // Simulate form submission
                    setTimeout(() => {
                        btnText.style.display = 'block';
                        btnLoader.style.display = 'none';
                        
                        // Show success animation
                        submitBtn.style.background = 'linear-gradient(135deg, var(--accent-peacock-green), #00CC00)';
                        btnText.textContent = 'Message Sent!';
                        
                        // Reset after 3 seconds
                        setTimeout(() => {
                            submitBtn.style.background = 'linear-gradient(135deg, var(--accent-peacock-green), var(--accent-peacock-blue))';
                            btnText.textContent = 'Send Encrypted Message';
                            contactForm.reset();
                            
                            // Remove focused class from all form groups
                            formElements.forEach(group => group.classList.remove('focused'));
                        }, 3000);
                    }, 2000);
                });
            }
        }

        // Social links hover effects
        function initSocialAnimations() {
            socialItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        }

        // Contact cards sequential animation
        function animateContactCards() {
            contactCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
                card.classList.add('animate-in');
            });
        }

        // Initialize all contact animations
        initScrollAnimations();
        initFormAnimations();
        initSocialAnimations();
        
        // Observe contact section for entry animations
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateContactCards();
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        contactObserver.observe(contactSection);
    }

    // Initialize enhanced contact animations
    initContactAnimations();

    // --- Scroll Progress Indicator ---
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - winHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });

    // --- Active Navigation Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    });
});
