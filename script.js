// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Parallax effect for background
const bgImage = document.getElementById('bgImage');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    bgImage.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
});

// Mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const moveX = (mouseX - 0.5) * 50;
    const moveY = (mouseY - 0.5) * 50;

    bgImage.style.transform = `translateY(${window.pageYOffset * 0.5}px) translate(${moveX}px, ${moveY}px) scale(1.1)`;
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all scroll-animated elements
const scrollElements = document.querySelectorAll('[data-scroll], .section-header, .about-card, .service-card, .contact-heading, .contact-text, .contact-links');

scrollElements.forEach((element) => {
    observer.observe(element);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Glitch effect on hover
const glitchElement = document.querySelector('.glitch');

if (glitchElement) {
    glitchElement.addEventListener('mouseenter', () => {
        let iterations = 0;
        const maxIterations = 3;

        const glitchInterval = setInterval(() => {
            if (iterations < maxIterations) {
                glitchElement.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                glitchElement.style.textShadow = `
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 255, 255, 0.7),
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255, 0, 255, 0.7)
                `;
                iterations++;
            } else {
                glitchElement.style.transform = 'translate(0, 0)';
                glitchElement.style.textShadow = `
                    0 0 10px rgba(0, 255, 255, 0.3),
                    0 0 20px rgba(0, 255, 255, 0.2),
                    0 0 30px rgba(0, 255, 255, 0.1)
                `;
                clearInterval(glitchInterval);
            }
        }, 50);
    });
}

// Service cards line animation on scroll
const serviceCards = document.querySelectorAll('.service-card');

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                const line = entry.target.querySelector('.service-line');
                if (line) {
                    line.style.width = '100%';
                }
            }, 300);
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    serviceObserver.observe(card);
});

// About cards stagger animation
const aboutCards = document.querySelectorAll('.about-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, observerOptions);

aboutCards.forEach(card => {
    cardObserver.observe(card);
});

// Progress indicator based on scroll
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    // You can add a progress bar here if desired
    document.body.style.setProperty('--scroll-progress', scrollPercent + '%');
});

// Add cursor glow effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(0, 255, 255, 0.3);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    transition: transform 0.15s ease, opacity 0.15s ease;
    opacity: 0;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Add glow on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.background = 'rgba(0, 255, 255, 0.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'rgba(0, 255, 255, 0.3)';
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Initialize animations on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add scroll snap points for smooth section transitions
const sections = document.querySelectorAll('.section');
let isScrolling;

window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
        // Scroll snap logic can be added here if desired
    }, 150);
}, false);

// Easter egg: Press 'D' for debug mode
let debugMode = false;
document.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') {
        debugMode = !debugMode;
        if (debugMode) {
            document.body.style.outline = '2px solid cyan';
            console.log('🐻 Debug mode activated');
        } else {
            document.body.style.outline = 'none';
            console.log('🐻 Debug mode deactivated');
        }
    }
});
