/**
 * Инициализация формы обратной связи
 * @param {string} formId - ID формы
 * @param {string} serviceId - EmailJS service ID
 * @param {string} templateId - EmailJS template ID
 */
function initContactForm(formId = 'contactForm', serviceId, templateId) {
    const contactForm = document.getElementById(formId);
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Валидация телефона
        const phoneInput = this.querySelector('input[name="phone"]');
        if (!validatePhone(phoneInput.value)) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }

        // Подготовка данных
        const formData = {
            name: this.name.value,
            phone: this.phone.value,
            message: this.message.value
        };

        // Отправка через EmailJS
        emailjs.send(serviceId, templateId, formData)
            .then(() => {
                alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                this.reset();
            })
            .catch((error) => {
                console.error('Ошибка отправки:', error);
                alert('Ошибка при отправке. Пожалуйста, позвоните нам: +7 (812) 305-25-52');
            });
    });

    /**
     * Валидация номера телефона
     * @param {string} phone - Номер телефона
     * @returns {boolean} - Валидность номера
     */
    function validatePhone(phone) {
        const regex = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
        return regex.test(phone);
    }
}