/**
 * WeQRious Landing Page Scripts
 */

(function() {
    'use strict';

    // ===================================
    // Theme Switcher (System / Light / Dark)
    // ===================================
    var themeSwitcher = document.getElementById('themeSwitcher');
    var themeOptions = document.querySelectorAll('.theme-option');
    var html = document.documentElement;

    // Get system preference
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Apply theme to document
    function applyTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }

    // Get saved preference (system, light, or dark)
    function getSavedPreference() {
        return localStorage.getItem('theme-preference') || 'system';
    }

    // Save preference
    function savePreference(preference) {
        localStorage.setItem('theme-preference', preference);
    }

    // Update active button state
    function updateActiveButton(preference) {
        themeOptions.forEach(function(btn) {
            if (btn.getAttribute('data-theme') === preference) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Set theme based on preference
    function setTheme(preference) {
        savePreference(preference);
        updateActiveButton(preference);

        if (preference === 'system') {
            applyTheme(getSystemTheme());
        } else {
            applyTheme(preference);
        }
    }

    // Initialize theme
    setTheme(getSavedPreference());

    // Add click handlers to theme options
    themeOptions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var preference = this.getAttribute('data-theme');
            setTheme(preference);
        });
    });

    // Listen for system theme changes (only applies when preference is 'system')
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            if (getSavedPreference() === 'system') {
                applyTheme(getSystemTheme());
            }
        });
    }

    // ===================================
    // Smooth Scroll
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // Navbar Background on Scroll
    // ===================================
    var nav = document.querySelector('.nav');
    var hero = document.querySelector('.hero');

    if (nav && hero) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.style.backgroundColor = 'rgba(0, 119, 182, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
            } else {
                nav.style.backgroundColor = 'transparent';
                nav.style.backdropFilter = 'none';
            }
        });
    }

    // ===================================
    // Fade-in Animations
    // ===================================
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and steps
    document.querySelectorAll('.problem-card, .solution-card, .step, .contact-card').forEach(function(el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add CSS for fade-in animation
    var style = document.createElement('style');
    style.textContent = '\
        .fade-in {\
            opacity: 0;\
            transform: translateY(20px);\
            transition: opacity 0.6s ease, transform 0.6s ease;\
        }\
        .fade-in.visible {\
            opacity: 1;\
            transform: translateY(0);\
        }\
    ';
    document.head.appendChild(style);

})();
