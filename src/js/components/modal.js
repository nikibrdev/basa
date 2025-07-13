document.addEventListener('DOMContentLoaded', function() {
  // 1. Находим все необходимые элементы
  const modal = document.querySelector('.modal');
  const modalInner = document.querySelector('.modal__inner');
  const modalLink = document.querySelector('.modal__link');
  const musicSection = document.querySelector('.music');

  // 2. Проверяем, что все элементы существуют
  if (!modal || !modalInner || !modalLink || !musicSection) {
    return;
  }

  // 3. Флаг для отслеживания, было ли показано модальное окно
  let wasModalShown = false;

  // 4. Инициализируем начальное состояние
  modal.style.display = 'none';
  modalInner.style.transform = 'translateY(100%)';

  // 5. Функция для показа модального окна
  function showModal() {
    if (wasModalShown) return;

    console.log('Показываем модальное окно');
    wasModalShown = true;
    modal.style.display = 'block';

    setTimeout(function() {
      modalInner.style.transform = 'translateY(0)';
    }, 10);

    // Удаляем обработчик скролла после показа
    window.removeEventListener('scroll', handleScroll);
  }

  // 6. Функция для скрытия модального окна
  function hideModal() {
    modalInner.style.transform = 'translateY(100%)';

    setTimeout(function() {
      modal.style.display = 'none';
    }, 300);
  }

  // 7. Обработчики событий
  modalLink.addEventListener('click', function(e) {
    e.preventDefault();
    hideModal();
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // 8. Функция проверки видимости секции music
  function isMusicSectionVisible() {
    const rect = musicSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Элемент виден, если его верхняя граница выше нижней границы окна
    return rect.top <= windowHeight * 0.8; // 80% высоты окна
  }

  // 9. Обработчик скролла
  function handleScroll() {
    if (isMusicSectionVisible() && !wasModalShown) {
      showModal();
    }
  }

  // 10. Добавляем обработчик с троттлингом
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 100);
  });

  // 11. Проверяем сразу при загрузке
  handleScroll();
});
