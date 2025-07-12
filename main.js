document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (targetId === 'home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            entry.target.classList.remove('animate-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.hero-content, .hero-visual, .section-title, .about-description, .feature-item, .gallery-item, .member-card, .photos-btn'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

function toggleGallery() {
    const gallery = document.querySelector('.gallery-grid');
    const btn = document.querySelector('.photos-btn');
    
    if (gallery.style.maxHeight === 'none') {
        gallery.style.maxHeight = '600px';
        btn.querySelector('.btn-text').textContent = 'VIEW ALL PHOTOS';
    } else {
        gallery.style.maxHeight = 'none';
        btn.querySelector('.btn-text').textContent = 'SHOW LESS';
    }
}

document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    // Add glow effect based on scroll position
    if (scrollTop > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Staggered animation for gallery items
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const galleryItems = entry.target.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        staggerObserver.observe(galleryGrid);
    }
});
