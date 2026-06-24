/**
 * NAJMAT ALMESAFATY TECHNICAL SERVICES L.L.C - Core Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Responsive Hamburger Navigation Toggle
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            
            // Lock body scroll when mobile drawer is visible
            if (navMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu and release body lock when drawer link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // 2. Sticky Header Styling on Scroll
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run immediate check on page load

    // ==========================================
    // 3. Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once animated in
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // 4. Scroll Active Navigation Highlights
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // accounting for sticky header offset
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-menu a').forEach(el => el.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // ==========================================
    // 5. Contact Form Interaction & Success feedback
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetFormBtn');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && formSuccess && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            // Ensure basic presence check
            if (!name || !email || !phone || !service || !message) {
                alert('Please fill out all contact fields before submitting.');
                return;
            }

            // Put button into loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate server network dispatch delay
            setTimeout(() => {
                // Clear loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                // Hide inputs & show beautiful golden success card
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Clear contact form fields
                contactForm.reset();
            }, 1500);
        });

        // Reset state callback
        if (resetFormBtn) {
            resetFormBtn.addEventListener('click', () => {
                formSuccess.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
        }
    }
});
