// Инициализация каруселей
function initCarousel(carouselId, dotsId) {
    const carousel = document.getElementById(carouselId);
    const dotsContainer = document.getElementById(dotsId);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = dotsContainer.querySelectorAll('.dot');
    const prevBtn = carousel.closest('.project-carousel').querySelector('.prev-btn');
    const nextBtn = carousel.closest('.project-carousel').querySelector('.next-btn');

    let currentIndex = 0;

    // Функция для показа слайда
    function showSlide(index) {
        // Обновляем карусель
        carousel.style.transform = `translateX(-${index * 100}%)`;

        // Обновляем точки
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');

        currentIndex = index;
    }

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Кнопка "Назад"
    prevBtn.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    });

    // Кнопка "Вперед"
    nextBtn.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    });

    // Автопрокрутка
    let autoSlide = setInterval(() => {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    }, 5000);

    // Остановка автопрокрутки при наведении
    carousel.closest('.carousel-container').addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    carousel.closest('.carousel-container').addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            const newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        }, 5000);
    });
}

// Инициализация всех каруселей на странице
document.addEventListener('DOMContentLoaded', () => {
    initCarousel('carousel1', 'dots1');
    initCarousel('carousel2', 'dots2');
    initCarousel('carousel3', 'dots3');
    initCarousel('carousel4', 'dots4');
})