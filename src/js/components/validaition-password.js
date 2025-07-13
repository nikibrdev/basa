document.addEventListener('DOMContentLoaded', function() {
  // Проверяем существование формы перед работой с ней
  const form = document.querySelector('.form');
  if (!form) return;

  const successBlock = document.querySelector('.form__success');
  if (!successBlock) return;

  // Безопасное получение элементов input
  const currentPasswordInput = form.querySelector('input[name="current_password"]');
  const newPasswordInput = form.querySelector('input[name="new_password"]');
  const confirmPasswordInput = form.querySelector('input[name="confirm_password"]');

  if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput) return;

  const passwordInputs = {
    current: currentPasswordInput,
    new: newPasswordInput,
    confirm: confirmPasswordInput
  };

  // Функция валидации формы
  function validateForm() {
    let isValid = true;
    const errorMessages = form.querySelectorAll('.form__error-message');

    // Сброс предыдущих ошибок
    errorMessages.forEach(msg => {
      msg.textContent = '';
      msg.style.display = 'none';
    });

    // Проверка заполненности полей
    for (const key in passwordInputs) {
      if (!passwordInputs[key].value.trim()) {
        const errorElement = passwordInputs[key].closest('.form__field-wrapper')
          .querySelector('.form__error-message');
        if (errorElement) {
          errorElement.textContent = 'Это поле обязательно для заполнения';
          errorElement.style.display = 'block';
        }
        isValid = false;
      }
    }

    // Проверка совпадения новых паролей
    if (passwordInputs.new.value !== passwordInputs.confirm.value) {
      const errorElement = passwordInputs.confirm.closest('.form__field-wrapper')
        .querySelector('.form__error-message');
      if (errorElement) {
        errorElement.textContent = 'Пароли не совпадают';
        errorElement.style.display = 'block';
      }
      isValid = false;
    }

    return isValid;
  }

  // Обработчик отправки формы
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateForm()) {
      // Здесь можно добавить AJAX-запрос для отправки данных на сервер

      // Показываем блок успеха
      successBlock.style.display = 'block';
      form.style.display = 'none';

      // Через 800ms переходим на другую страницу
      setTimeout(() => {
        window.location.href = 'personal-cabinet.html';
      }, 800);
    }
  });
});
