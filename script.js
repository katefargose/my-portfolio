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

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Get error message elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const subjectError = document.getElementById('subjectError');
            const messageError = document.getElementById('messageError');
            const successMessage = document.getElementById('formSuccess');

            // Reset previous errors
            [nameError, emailError, subjectError, messageError].forEach(el => {
                if (el) el.textContent = '';
            });
            if (successMessage) {
                successMessage.classList.remove('show');
                successMessage.textContent = '';
            }

            let isValid = true;

            // Validate name
            if (!name.value.trim()) {
                if (nameError) nameError.textContent = 'Name is required';
                isValid = false;
            } else if (name.value.trim().length < 2) {
                if (nameError) nameError.textContent = 'Name must be at least 2 characters';
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                if (emailError) emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }

            // Validate subject
            if (!subject.value.trim()) {
                if (subjectError) subjectError.textContent = 'Subject is required';
                isValid = false;
            } else if (subject.value.trim().length < 3) {
                if (subjectError) subjectError.textContent = 'Subject must be at least 3 characters';
                isValid = false;
            }

            // Validate message
            if (!message.value.trim()) {
                if (messageError) messageError.textContent = 'Message is required';
                isValid = false;
            } else if (message.value.trim().length < 10) {
                if (messageError) messageError.textContent = 'Message must be at least 10 characters';
                isValid = false;
            }

            // If form is valid, show success message
            if (isValid) {
                if (successMessage) {
                    successMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
                    successMessage.classList.add('show');
                }
                
                // Reset form
                contactForm.reset();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Scroll to first error
                const firstError = [nameError, emailError, subjectError, messageError].find(el => el && el.textContent);
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });

        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement && errorElement.textContent) {
                    validateField(this);
                }
            });
        });

        function validateField(field) {
            const errorElement = document.getElementById(field.id + 'Error');
            if (!errorElement) return;

            let errorMessage = '';

            switch(field.id) {
                case 'name':
                    if (!field.value.trim()) {
                        errorMessage = 'Name is required';
                    } else if (field.value.trim().length < 2) {
                        errorMessage = 'Name must be at least 2 characters';
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!field.value.trim()) {
                        errorMessage = 'Email is required';
                    } else if (!emailRegex.test(field.value)) {
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'subject':
                    if (!field.value.trim()) {
                        errorMessage = 'Subject is required';
                    } else if (field.value.trim().length < 3) {
                        errorMessage = 'Subject must be at least 3 characters';
                    }
                    break;
                case 'message':
                    if (!field.value.trim()) {
                        errorMessage = 'Message is required';
                    } else if (field.value.trim().length < 10) {
                        errorMessage = 'Message must be at least 10 characters';
                    }
                    break;
            }

            errorElement.textContent = errorMessage;
        }
    }

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
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

