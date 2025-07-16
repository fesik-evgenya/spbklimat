document.addEventListener('DOMContentLoaded', function() {
    // Инициализация анимаций
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 120,
            delay: 100,
        });
    }

    // Инициализация карты (только если элемент существует)
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        initMap();
    }

    // Инициализация формы (только если элемент существует)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Инициализация EmailJS
        emailjs.init('YOUR_EMAILJS_USER_ID');
        initContactForm(
            'contactForm',
            'YOUR_EMAILJS_SERVICE_ID',
            'YOUR_EMAILJS_TEMPLATE_ID'
        );
    }
});