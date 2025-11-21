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
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        const socialCards = document.querySelectorAll('.social-card');
        const submitBtn = document.querySelector('.cyber-submit-btn');

        // Initialize scroll animations
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
            formInputs.forEach(input => {
                // Check initial values and add focused class if needed
                if (input.value) {
                    input.parentElement.parentElement.classList.add('focused');
                }

                input.addEventListener('focus', function() {
                    this.parentElement.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.parentElement.classList.remove('focused');
                    }
                });

                // Add input validation effects
                input.addEventListener('input', function() {
                    if (this.validity.valid) {
                        this.style.color = 'var(--text-light)';
                    } else {
                        this.style.color = '#ff6b6b';
                    }
                });
            });

            // Enhanced form submission
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const btnText = submitBtn.querySelector('.btn-text');
                    const btnLoader = submitBtn.querySelector('.btn-loader');
                    const btnIcon = submitBtn.querySelector('.btn-icon');
                    
                    // Show loading state
                    btnText.textContent = 'Encrypting Message...';
                    btnIcon.style.display = 'none';
                    btnLoader.style.display = 'block';
                    submitBtn.style.pointerEvents = 'none';
                    
                    // Simulate encryption and sending
                    setTimeout(() => {
                        btnLoader.style.display = 'none';
                        
                        // Success state
                        submitBtn.style.background = 'linear-gradient(135deg, #00CC00, #00FFAA)';
                        btnText.textContent = 'Message Sent Successfully!';
                        
                        // Create particle effect
                        createParticleEffect(submitBtn);
                        
                        // Reset form after delay
                        setTimeout(() => {
                            submitBtn.style.background = 'linear-gradient(135deg, var(--accent-peacock-green), var(--accent-peacock-blue))';
                            btnText.textContent = 'Send Encrypted Message';
                            btnIcon.style.display = 'block';
                            submitBtn.style.pointerEvents = 'auto';
                            contactForm.reset();
                            
                            // Remove focused class from all form groups
                            document.querySelectorAll('.form-group').forEach(group => {
                                group.classList.remove('focused');
                            });
                        }, 3000);
                    }, 2500);
                });
            }
        }

        // Particle effect for form submission
        function createParticleEffect(element) {
            const rect = element.getBoundingClientRect();
            const particles = 15;
            
            for (let i = 0; i < particles; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: var(--accent-peacock-green);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                `;
                
                document.body.appendChild(particle);
                
                const angle = Math.random() * Math.PI * 2;
                const velocity = 2 + Math.random() * 2;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                let opacity = 1;
                const animateParticle = () => {
                    opacity -= 0.02;
                    particle.style.opacity = opacity;
                    particle.style.transform = `translate(${vx * (1 - opacity) * 50}px, ${vy * (1 - opacity) * 50}px) scale(${1 - opacity})`;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animateParticle);
                    } else {
                        particle.remove();
                    }
                };
                
                animateParticle();
            }
        }

        // Enhanced contact card interactions
        function initContactCardAnimations() {
            contactCards.forEach(card => {
                card.addEventListener('mouseenter', function(e) {
                    // Create ripple effect
                    const ripple = this.querySelector('.contact-ripple');
                    if (ripple) {
                        const rect = this.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        ripple.style.left = x + 'px';
                        ripple.style.top = y + 'px';
                    }
                    
                    // Add floating animation
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Social card animations
        function initSocialCardAnimations() {
            socialCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const orbits = this.querySelectorAll('.orbit');
                    orbits.forEach(orbit => {
                        orbit.style.animationDuration = '1.5s';
                    });
                });
                
                card.addEventListener('mouseleave', function() {
                    const orbits = this.querySelectorAll('.orbit');
                    orbits.forEach(orbit => {
                        orbit.style.animationDuration = '3s';
                    });
                });
            });
        }

        // Initialize all animations
        initScrollAnimations();
        initFormAnimations();
        initContactCardAnimations();
        initSocialCardAnimations();
        
        // Background element animations
        function initBackgroundAnimations() {
            const bgElements = document.querySelectorAll('.bg-element');
            bgElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 2}s`;
            });
        }
        
        initBackgroundAnimations();
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

    // --- Floating Social Sidebar Interactions ---
    function initFloatingSocial() {
        const floatingSocial = document.querySelector('.floating-social-sidebar');
        const socialFloats = document.querySelectorAll('.social-float');
        
        // Add hover effects to floating social icons
        socialFloats.forEach(float => {
            float.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) translateX(-5px)';
            });
            
            float.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateX(0)';
            });
        });
        
        // Hide floating social on scroll down, show on scroll up
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                floatingSocial.style.transform = 'translateY(-50%) translateX(100px)';
                floatingSocial.style.opacity = '0';
            } else {
                // Scrolling up
                floatingSocial.style.transform = 'translateY(-50%) translateX(0)';
                floatingSocial.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    initFloatingSocial();

    // --- Hero Social Links Animation ---
    function initHeroSocialAnimations() {
        const heroSocialLinks = document.querySelectorAll('.hero-social-link');
        
        heroSocialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initHeroSocialAnimations();

    // --- Footer Social Links Animation ---
    function initFooterSocialAnimations() {
        const footerSocialLinks = document.querySelectorAll('.footer-social-link');
        
        footerSocialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    initFooterSocialAnimations();
});
