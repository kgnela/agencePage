function scrollToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentPosition = window.scrollY + window.innerHeight;
    let nextSection = null;

    for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        const sectionBottom = sectionTop + sections[i].offsetHeight;

        if (currentPosition < sectionBottom) {
            nextSection = sections[i];
            break;
        }
    }

    if (nextSection) {
        window.scrollTo({
            top: nextSection.offsetTop,
            behavior: 'smooth'
        });
    }
}


const carousel = document.querySelector('.carousel');
const services = document.querySelectorAll('.service');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let startX = 0;
let isDragging = false;

nextBtn.addEventListener('click', () => moveToNext());
prevBtn.addEventListener('click', () => moveToPrev());

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.getAttribute('data-index'));
        updateCarousel();
    });
});

// Swipe (dotyk)
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carousel.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const moveX = e.touches[0].clientX;
        const difference = startX - moveX;
        if (difference > 50) {
            moveToNext();
            isDragging = false;
        } else if (difference < -50) {
            moveToPrev();
            isDragging = false;
        }
    }
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
});

function moveToNext() {
    if (currentIndex < services.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}

function moveToPrev() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = services.length - 1;
    }
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Inicjalizacja
updateCarousel();
