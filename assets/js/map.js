/**
 * Инициализация Яндекс.Карты с логотипом компании в качестве метки
 * @param {Array} center - Координаты центра [широта, долгота]
 * @param {number} zoom - Уровень масштабирования
 * @param {string} elementId - ID контейнера для карты
 */
function initMap(center = [59.852470, 30.285200], zoom = 16, elementId = 'map') {
    if (typeof ymaps === 'undefined') {
        console.error('Yandex Maps API not loaded');
        return;
    }

    ymaps.ready(() => {
        const myMap = new ymaps.Map(elementId, {
            center: center,
            zoom: zoom,
            controls: ['zoomControl']
        });

        // Путь к логотипу компании
        const logoPath = './assets/image/logo/logo.svg';

        // Размеры метки (уменьшены в 2 раза)
        const iconSize = [30, 30]; // Было [60, 60]
        const iconOffset = [-15, -15]; // Было [-30, -30]
        const shadowSize = [35, 35]; // Было [70, 70]

        // Создание кастомной метки с логотипом компании
        const myPlacemark = new ymaps.Placemark(
            center,
            {
                balloonContent: '<strong>Климат СПб</strong><br>Профессиональные климатические решения',
                hintContent: 'Наш офис'
            },
            {
                // Используем логотип компании как иконку
                iconLayout: 'default#image',
                iconImageHref: logoPath,
                iconImageSize: iconSize,
                iconImageOffset: iconOffset,

                // Область клика
                iconShape: {
                    type: 'Circle',
                    coordinates: [0, 0],
                    radius: 15 // Уменьшено с 30
                },

                // Тень
                iconShadow: true,
                shadowImageHref: logoPath,
                shadowImageSize: shadowSize,
                shadowOffset: [3, 8], // Уменьшено
                shadowOpacity: 0.2 // Сделана менее заметной
            }
        );

        // Добавляем метку на карту
        myMap.geoObjects.add(myPlacemark);

        // Открываем балун при клике на метку
        myPlacemark.events.add('click', function() {
            myPlacemark.balloon.open();
        });

        // Анимация пульсации (теперь менее агрессивная)
        setInterval(() => {
            const icon = myPlacemark.options.get('iconImageSize');
            const newSize = icon[0] === 30 ? [32, 32] : [30, 30];
            myPlacemark.options.set('iconImageSize', newSize);
        }, 1500);
    });
}