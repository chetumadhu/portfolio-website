// Main JavaScript File for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Loading Screen
    // ======================
    const loader = document.querySelector('.loader');
    
    // Simulate loading with timeout
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);

    // ======================
    // Dark Mode Toggle
    // ======================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    // Check for saved theme preference
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    darkModeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ======================
    // Mobile Navigation
    // ======================
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    
    navbarToggle.addEventListener('click', () => {
        const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
        
        navbarToggle.setAttribute('aria-expanded', !isExpanded);
        navbarNav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.setAttribute('aria-expanded', 'false');
            navbarNav.classList.remove('active');
        });
    });

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // Sticky Navigation
    // ======================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // ======================
    // Typewriter Effect
    // ======================
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            
            typewriterElement.textContent = currentChar;
            
            if (!isDeleting && charIndex < currentWord.length) {
                // Typing forward
                charIndex++;
                typingSpeed = 100;
            } else if (isDeleting && charIndex > 0) {
                // Deleting backward
                charIndex--;
                typingSpeed = 50;
            } else {
                // Change word
                isDeleting = !isDeleting;
                wordIndex = (!isDeleting) ? (wordIndex + 1) % words.length : wordIndex;
                typingSpeed = isDeleting ? 1500 : 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typewriter effect
        setTimeout(type, 1000);
    }

    // ======================
    // Skill Level Animation
    // ======================
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.level-bar');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Animate when skills section is in view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ======================
    // Project Filtering
    // ======================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ======================
    // Form Submission
    // ======================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual fetch/axios call)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ======================
    // Current Year in Footer
    // ======================
    document.getElementById('year').textContent = new Date().getFullYear();

    // ======================
    // Particles.js Initialization
    // ======================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#3a86ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3a86ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}