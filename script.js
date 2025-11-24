// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the theme
    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        html.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            if (themeIcon) {
                if (newTheme === 'dark') {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        });
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Gallery scroll animation - images appear as you scroll
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible
                galleryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all gallery items
    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalClose = document.getElementById('modalClose');
    const viewButtons = document.querySelectorAll('.view-btn');

    if (viewButtons.length > 0) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const galleryItem = this.closest('.gallery-item');
                const image = galleryItem.querySelector('img');
                const category = galleryItem.querySelector('.gallery-category').textContent;
                const title = galleryItem.querySelector('h3').textContent;
                const description = galleryItem.querySelector('p').textContent;

                if (modal) {
                    document.getElementById('modalImage').src = image.src.replace('w=800&h=600', 'w=1200&h=900');
                    document.getElementById('modalCategory').textContent = category;
                    document.getElementById('modalTitle').textContent = title;
                    document.getElementById('modalDescription').textContent = description;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- REMOVE native JS submit for Formspree ---
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // ...old validation/message code...
    //     });
    //     // ...old real-time validation...
    // }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation (excluding gallery items which have their own observer)
    const animateElements = document.querySelectorAll('.intro-card, .interest-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // --- Interests interactive expansion ---
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            // Remove .active from all others
            interestCards.forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            this.classList.toggle('active');
        });
    });
    // Collapse when clicking outside
    document.addEventListener('click', function(e) {
        interestCards.forEach(card => card.classList.remove('active'));
    });

    // --- About Interests & Hobbies click effect ---
    const aboutInterests = document.querySelectorAll('.interests-section .interest-card');
    aboutInterests.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            aboutInterests.forEach(c => { if (c !== card) c.classList.remove('active'); });
            card.classList.toggle('active');
        });
    });
    document.addEventListener('click', function() {
        aboutInterests.forEach(card => card.classList.remove('active'));
    });
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

