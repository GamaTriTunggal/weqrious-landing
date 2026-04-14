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

    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }

    function getSavedPreference() {
        return localStorage.getItem('theme-preference') || 'system';
    }

    function savePreference(preference) {
        localStorage.setItem('theme-preference', preference);
    }

    function updateActiveButton(preference) {
        themeOptions.forEach(function(btn) {
            if (btn.getAttribute('data-theme') === preference) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function setTheme(preference) {
        savePreference(preference);
        updateActiveButton(preference);

        if (preference === 'system') {
            applyTheme(getSystemTheme());
        } else {
            applyTheme(preference);
        }
    }

    setTheme(getSavedPreference());

    themeOptions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var preference = this.getAttribute('data-theme');
            setTheme(preference);
        });
    });

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

    document.querySelectorAll('.problem-card, .solution-card, .step, .contact-card, .industry-card, .pricing-card, .highlight-item').forEach(function(el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });

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

    // ===================================
    // FAQ Accordion
    // ===================================
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                var isActive = item.classList.contains('active');

                faqItems.forEach(function(faq) {
                    faq.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ===================================
    // Language Switcher + Auto-detect Banner
    // ===================================
    var LANG_PREF_KEY = 'wq-lang-preference';
    var LANG_BANNER_DISMISSED_KEY = 'wq-lang-banner-dismissed';

    var langData = null;
    var langDataEl = document.getElementById('langMapData');
    if (langDataEl) {
        try {
            langData = JSON.parse(langDataEl.textContent);
        } catch (err) {
            langData = null;
        }
    }

    var switcher = document.getElementById('langSwitcher');
    var switcherToggle = document.getElementById('langSwitcherToggle');

    if (switcher && switcherToggle) {
        switcherToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            var open = switcher.classList.toggle('open');
            switcherToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        document.addEventListener('click', function(e) {
            if (switcher.classList.contains('open') && !switcher.contains(e.target)) {
                switcher.classList.remove('open');
                switcherToggle.setAttribute('aria-expanded', 'false');
            }
        });

        switcher.querySelectorAll('.lang-switcher-item').forEach(function(link) {
            link.addEventListener('click', function() {
                var lang = this.getAttribute('data-lang');
                if (lang) {
                    try { localStorage.setItem(LANG_PREF_KEY, lang); } catch (err) {}
                }
            });
        });
    }

    function normalizeLang(raw) {
        if (!raw) return null;
        var lower = raw.toLowerCase();
        var exactMap = {
            'id': 'id', 'id-id': 'id',
            'ms': 'ms', 'ms-my': 'ms', 'ms-bn': 'ms',
            'tl': 'fil', 'fil': 'fil', 'fil-ph': 'fil', 'tl-ph': 'fil',
            'vi': 'vi', 'vi-vn': 'vi',
            'zh': 'zh-cn', 'zh-cn': 'zh-cn', 'zh-sg': 'zh-cn',
            'zh-hans': 'zh-cn', 'zh-hans-cn': 'zh-cn',
            'zh-hk': 'zh-hk', 'yue': 'zh-hk', 'yue-hk': 'zh-hk', 'zh-hant-hk': 'zh-hk',
            'zh-tw': 'zh-tw', 'zh-hant': 'zh-tw', 'zh-hant-tw': 'zh-tw',
            'ko': 'ko', 'ko-kr': 'ko',
            'ja': 'ja', 'ja-jp': 'ja',
            'km': 'km', 'km-kh': 'km',
            'th': 'th', 'th-th': 'th',
            'en': 'en'
        };
        if (exactMap[lower]) return exactMap[lower];
        var primary = lower.split('-')[0];
        if (exactMap[primary]) return exactMap[primary];
        return 'en';
    }

    function detectBrowserLang() {
        var langs = navigator.languages || [navigator.language];
        for (var i = 0; i < langs.length; i++) {
            var norm = normalizeLang(langs[i]);
            if (norm) return norm;
        }
        return 'en';
    }

    var banner = document.getElementById('langBanner');

    if (banner && langData) {
        var currentLang = langData.current;
        var detectedLang = detectBrowserLang();
        var savedPref = null;
        try { savedPref = localStorage.getItem(LANG_PREF_KEY); } catch (err) {}
        var bannerDismissed = null;
        try { bannerDismissed = localStorage.getItem(LANG_BANNER_DISMISSED_KEY); } catch (err) {}

        var shouldPromptLang = null;
        if (!savedPref && detectedLang && detectedLang !== currentLang && bannerDismissed !== detectedLang) {
            shouldPromptLang = detectedLang;
        }

        if (shouldPromptLang) {
            var target = null;
            for (var j = 0; j < langData.languages.length; j++) {
                if (langData.languages[j].lang === shouldPromptLang) {
                    target = langData.languages[j];
                    break;
                }
            }

            if (target) {
                var bannerText = document.getElementById('langBannerText');
                var switchBtn = document.getElementById('langBannerSwitch');
                var dismissBtn = document.getElementById('langBannerDismiss');

                if (bannerText) bannerText.textContent = target.switchPrompt;
                if (switchBtn) {
                    switchBtn.textContent = target.switchLabel;
                    switchBtn.addEventListener('click', function() {
                        try { localStorage.setItem(LANG_PREF_KEY, target.lang); } catch (err) {}
                        window.location.href = target.url;
                    });
                }
                if (dismissBtn) {
                    dismissBtn.addEventListener('click', function() {
                        try { localStorage.setItem(LANG_BANNER_DISMISSED_KEY, shouldPromptLang); } catch (err) {}
                        banner.hidden = true;
                    });
                }

                banner.hidden = false;
            }
        }
    }

})();
