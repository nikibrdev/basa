document.querySelectorAll('.form__input[type="password"]').forEach(input => {
  // Находим родительский блок поля (.form__field-wrapper)
  const fieldWrapper = input.closest('.form__field-wrapper');
  if (!fieldWrapper) return;

  // Кнопка переключения — это соседний элемент после <label>
  const toggleButton = fieldWrapper.querySelector('.form__toggle');
  if (!toggleButton) return;

  // Иконка внутри кнопки
  const iconWrap = toggleButton.querySelector('.form__icon-wrap');
  if (!iconWrap) return;

  // Скрываем кнопку по умолчанию
  toggleButton.style.opacity = '0';
  toggleButton.style.visibility = 'hidden';
  toggleButton.style.transition = 'opacity 0.3s ease';

  // Показываем кнопку при фокусе на инпуте
  input.addEventListener('focus', () => {
    toggleButton.style.opacity = '1';
    toggleButton.style.visibility = 'visible';
  });

  // Скрываем кнопку при потере фокуса (с задержкой для клика)
  input.addEventListener('blur', () => {
    setTimeout(() => {
      toggleButton.style.opacity = '0';
      toggleButton.style.visibility = 'hidden';
    }, 200);
  });

  // Переключение видимости пароля
  toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    iconWrap.innerHTML = `
      <img class="form__icon" src="img/icons/${isPassword ? 'eye-off' : 'eye'}.svg" alt="">
    `;
  });
});
