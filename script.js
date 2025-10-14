// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for navbar styling
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(254, 252, 243, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.1)';
    } else {
        navbar.style.background = 'rgba(254, 252, 243, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show scroll indicator
    if (scrollTop > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.special-card, .menu-item, .contact-item, .news-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Card hover effects
const cards = document.querySelectorAll('.special-card, .menu-item, .contact-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.style.opacity = '1', 200);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.style.opacity = '1', 400);
    }
    if (heroDescription) {
        setTimeout(() => heroDescription.style.opacity = '1', 600);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.style.opacity = '1', 800);
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads (disabled for image logo)
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle && !heroTitle.querySelector('img')) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 150);
//     }
// });

// Counter animation for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Lazy loading for images (when real images are added)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

// Add lazy loading to images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Form validation (if contact form is added)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add form validation styles
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
    }
    
    .loaded .hero-title,
    .loaded .hero-subtitle,
    .loaded .hero-description,
    .loaded .hero-buttons {
        opacity: 0;
        transition: opacity 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// Scroll to top functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--wood-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
}

// Initialize scroll to top button
createScrollToTopButton();

// Preloader (optional)
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">나막집</div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--ivory);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader-content {
            text-align: center;
        }
        
        .preloader-logo {
            font-size: 2rem;
            font-weight: 700;
            color: var(--wood-primary);
            margin-bottom: 2rem;
        }
        
        .preloader-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--wood-light);
            border-top: 3px solid var(--wood-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
createPreloader();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Language detection and switching
function detectLanguage() {
    const currentPath = window.location.pathname;
    const currentLangElement = document.querySelector('.language-option.active .lang-flag');
    const currentLang = currentLangElement ? currentLangElement.textContent : '한';
    
    // Update current language display
    const currentLangDisplay = document.querySelector('.current-lang');
    if (currentLangDisplay) {
        currentLangDisplay.textContent = currentLang;
    }
    
    // Set document language attribute
    const html = document.documentElement;
    if (currentPath.includes('indexen.html')) {
        html.lang = 'en';
    } else if (currentPath.includes('indexja.html')) {
        html.lang = 'ja';
    } else if (currentPath.includes('indexzh-Hans.html')) {
        html.lang = 'zh-Hans';
    } else if (currentPath.includes('indexzh-Hant.html')) {
        html.lang = 'zh-Hant';
    } else {
        html.lang = 'ko';
    }
}

// Language dropdown toggle functionality
function initLanguageDropdown() {
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageBtn && languageDropdown) {
        // Toggle dropdown on button click
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });
    }
}

// Language switching functionality
function initLanguageSwitcher() {
    const languageOptions = document.querySelectorAll('.language-option');
    
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = option.getAttribute('href');
            
            // Add loading state
            const currentLang = document.querySelector('.current-lang');
            if (currentLang) {
                currentLang.textContent = '...';
            }
            
            // Navigate to selected language page
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });
}

// Initialize language functionality
document.addEventListener('DOMContentLoaded', () => {
    detectLanguage();
    initLanguageDropdown();
    initLanguageSwitcher();
});

// Google Maps location switcher
function initLocationSwitcher() {
    const locationItems = document.querySelectorAll('.location-item');
    const mapIframe = document.getElementById('google-map');
    
    // Map URLs for each location
    const mapUrls = {
        '1': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.048!2d129.111874!3d35.1346177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568edd6cffca979:0x5fe1cbbb1e6ac560!2z64KY66ek7KeR!5e0!3m2!1sko!2skr!4v1234567890123!5m2!1sko!2skr',
        '2': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.886!2d129.1257906!3d35.1544987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568ed000d2896f1:0x8945854140a96b45!2z64KY66ek7KeRIOqwkeyViOuvvOudjeygkA!5e0!3m2!1sko!2skr!4v1234567890124!5m2!1sko!2skr',
        '3': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.988!2d129.1507362!3d35.1581642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568930014cf8fd3:0xa9dcd44c8a19884a!2z7ZiE64yA67Kg64Sk7LmY7JWE!5e0!3m2!1sko!2skr!4v1234567890125!5m2!1sko!2skr'
    };
    
    locationItems.forEach(item => {
        item.addEventListener('click', () => {
            const location = item.getAttribute('data-location');
            
            // Remove active class from all items
            locationItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Change map URL
            if (mapIframe && mapUrls[location]) {
                mapIframe.src = mapUrls[location];
            }
        });
    });
}

// Initialize location switcher
document.addEventListener('DOMContentLoaded', () => {
    initLocationSwitcher();
});

// 다크 모드 강제 방지
function forceLightMode() {
    // HTML과 body에 라이트 모드 클래스 추가
    document.documentElement.style.colorScheme = 'light';
    document.body.style.colorScheme = 'light';
    
    // 다크 모드 관련 클래스 제거
    document.documentElement.classList.remove('dark', 'dark-mode');
    document.body.classList.remove('dark', 'dark-mode');
    
    // 다크 모드 감지 및 방지
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery.matches) {
        document.documentElement.style.backgroundColor = '#FEFCF3';
        document.body.style.backgroundColor = '#FEFCF3';
        document.body.style.color = '#2C1810';
    }
}

// 페이지 로드 시 즉시 실행
forceLightMode();

// DOM 로드 후에도 한 번 더 실행
document.addEventListener('DOMContentLoaded', forceLightMode);

// 다크 모드 변경 감지 시 실행
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', forceLightMode);
}

// Console welcome message
console.log(`
🍲 나막집 웹사이트에 오신 것을 환영합니다!
📍 부산 돼지곰탕 전문점
⭐ 미쉐린 가이드 선정 맛집
🌐 https://namakzip.com
`);

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        typeWriter,
        animateCounter,
        validateForm,
        debounce
    };
}
