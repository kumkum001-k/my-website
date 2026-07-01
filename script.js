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

    // ==========================================
    // 6. Interactive Feedback Form & Star Rating
    // ==========================================
    const starSelector = document.getElementById('starRatingSelector');
    const feedbackForm = document.getElementById('clientFeedbackForm');
    const feedbackSuccess = document.getElementById('feedbackFormSuccess');
    const resetFeedbackBtn = document.getElementById('resetFeedbackBtn');
    const reviewsList = document.getElementById('reviewsList');

    if (starSelector) {
        const stars = starSelector.querySelectorAll('span');
        const ratingInput = document.getElementById('ratingValue');

        stars.forEach(star => {
            star.addEventListener('click', () => {
                const selectedValue = parseInt(star.getAttribute('data-value'));
                ratingInput.value = selectedValue;

                // Update stars appearance
                stars.forEach(s => {
                    const val = parseInt(s.getAttribute('data-value'));
                    if (val <= selectedValue) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }

    if (feedbackForm && feedbackSuccess && reviewsList) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('clientName').value.trim();
            let role = document.getElementById('clientRole').value.trim();
            const ratingValue = parseInt(document.getElementById('ratingValue').value) || 5;
            const message = document.getElementById('feedbackMessage').value.trim();

            if (!name || !message) {
                alert('Please enter your name and review details.');
                return;
            }

            if (!role) {
                role = 'Client';
            }

            const submitReviewBtn = feedbackForm.querySelector('button[type="submit"]');
            submitReviewBtn.classList.add('loading');
            submitReviewBtn.disabled = true;

            // Generate user initials
            const nameParts = name.split(' ');
            let initials = nameParts[0].charAt(0).toUpperCase();
            if (nameParts.length > 1) {
                initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
            } else {
                initials += name.charAt(Math.min(1, name.length - 1)).toUpperCase();
            }

            setTimeout(() => {
                submitReviewBtn.classList.remove('loading');
                submitReviewBtn.disabled = false;

                // Hide form & show success
                feedbackForm.classList.add('hidden');
                feedbackSuccess.classList.remove('hidden');

                // Create new review element dynamically
                const newCard = document.createElement('div');
                newCard.className = 'feedback-card new-review';

                let starsHtml = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= ratingValue) {
                        starsHtml += '<span>★</span>';
                    } else {
                        starsHtml += '<span style="color: var(--text-gray);">★</span>';
                    }
                }

                newCard.innerHTML = `
                    <div class="star-rating">
                        ${starsHtml}
                    </div>
                    <p class="feedback-text">"${message}"</p>
                    <div class="feedback-user">
                        <div class="user-avatar">${initials}</div>
                        <div class="user-info">
                            <h4>${name}</h4>
                            <p>${role}</p>
                        </div>
                    </div>
                `;

                // Prepend to top of reviews list
                reviewsList.prepend(newCard);

                // Reset form fields and default stars rating selector to 5 stars
                feedbackForm.reset();
                if (starSelector) {
                    const stars = starSelector.querySelectorAll('span');
                    stars.forEach(s => s.classList.add('active'));
                    document.getElementById('ratingValue').value = 5;
                }
            }, 1000);
        });

        if (resetFeedbackBtn) {
            resetFeedbackBtn.addEventListener('click', () => {
                feedbackSuccess.classList.add('hidden');
                feedbackForm.classList.remove('hidden');
            });
        }
    }
});

