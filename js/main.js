// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');
    
    // You can add your JavaScript code here

    let page = window.location.pathname.split('/').pop();
    let active = '';
    if (page === 'index.html' || page === '') active = 'index';
    else if (page === 'acerca-de-mi.html') active = 'acerca';
    else if (page === 'consultorios.html') active = 'consultorios';
    else if (page === 'informacion.html') active = 'informacion';
    else if (page === 'contacto.html') active = 'contacto';
    renderNavbar(active);
    setupMobileMenu();
    setupFAQAccordion();
    setupCarousels();
});

function renderNavbar(activePage) {
    const nav = document.getElementById('main-navbar');
    if (!nav) return;
    nav.innerHTML = `
        <div class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <img src="assets/logo.svg" alt="Logo" class="logo-img" width="32" height="32">
                    <a href="index.html" class="logo-text">Dr. Andrés Humphreys</a>
                </div>
                <button class="mobile-menu-btn" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div class="nav-links">
                    <a href="index.html" class="nav-link${activePage === 'index' ? ' active' : ''}">Inicio</a>
                    <a href="acerca-de-mi.html" class="nav-link${activePage === 'acerca' ? ' active' : ''}">Acerca de mí</a>
                    <a href="consultorios.html" class="nav-link${activePage === 'consultorios' ? ' active' : ''}">Consultorios y turnos</a>
                    <a href="informacion.html" class="nav-link${activePage === 'informacion' ? ' active' : ''}">Información al paciente</a>
                    <a href="contacto.html" class="nav-link${activePage === 'contacto' ? ' active' : ''}">Contacto</a>
                    <a href="contacto.html" class="nav-button">Reservar turno</a>
                </div>
            </div>
        </div>
    `;
}


function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// FAQ Accordion functionality
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item.faq-expandable');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all others
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('open');
            });
            // Toggle this one
            item.classList.toggle('open');
        });
    });
}

function setupCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const images = Array.from(carousel.querySelectorAll('.carousel-img'));
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
        let current = 0;
        function updateCarousel() {
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
        }
        prevBtn.addEventListener('click', e => {
            e.stopPropagation();
            current = (current - 1 + images.length) % images.length;
            updateCarousel();
        });
        nextBtn.addEventListener('click', e => {
            e.stopPropagation();
            current = (current + 1) % images.length;
            updateCarousel();
        });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', e => {
                e.stopPropagation();
                current = i;
                updateCarousel();
            });
        });
        updateCarousel();
    });
} 