// JavaScript para o Menu Hamburguer (toggle)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});

// INÍCIO DO JAVASCRIPT DO CARROSSEL
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const dotsContainer = document.querySelector('.carousel-dots');
const dots = document.querySelectorAll('.carousel-dots .dot');

let currentIndex = 0;
const totalSlides = slides.length;
const slideInterval = 5000; // Tempo em ms para a troca automática (5 segundos)
let autoSlideTimer;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    carouselSlides.style.transform = `translateX(${offset}%)`;

    // Atualiza as classes 'active' dos dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, slideInterval);
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// Event Listeners para botões
nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide(); // Reinicia o timer após interação manual
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide(); // Reinicia o timer após interação manual
});

// Event Listeners para dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        const slideIndex = parseInt(dot.dataset.slide);
        showSlide(slideIndex);
        startAutoSlide(); // Reinicia o timer
    });
});

// Inicia o carrossel automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex); // Garante que o primeiro slide seja visível
    startAutoSlide();
});

// PAUSA o carrossel no hover (opcional)
carouselSlides.addEventListener('mouseenter', stopAutoSlide);
carouselSlides.addEventListener('mouseleave', startAutoSlide);

// FIM DO JAVASCRIPT DO CARROSSEL