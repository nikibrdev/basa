document.addEventListener('DOMContentLoaded', function() {
    // Проверяем наличие основного контейнера формы
    const authContainer = document.querySelector('[data-form-type="auth"]');
    if (!authContainer) return;

    // Получаем все необходимые элементы
    const form = document.querySelector('[data-form="auth"]');
    const toggleBtn = document.querySelector('[data-toggle-form]');
    const infoText = document.querySelector('[data-info-text]');
    const registerSection = document.querySelector('[data-section="register"]');
    const loginSection = document.querySelector('[data-section="login"]');
    const confirmationBlock = document.querySelector('.form__confirmation');
    const userEmailSpan = document.querySelector('.form__user-email');
    const confirmationBtn = document.querySelector('.form__confirmation-btn');
    const successBlock = document.querySelector('.form__success');
    const modalRightInfo = document.querySelector('.modal-right__info');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');

    // Если нет основных элементов - прекращаем выполнение
    if (!form || !toggleBtn || !infoText || !registerSection || !loginSection) {
      console.log('Не найдены необходимые элементы формы');
      return;
    }

    let isLoginForm = false;

    // Переключение между формами
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        isLoginForm = !isLoginForm;

        if (isLoginForm) {
          if (registerSection) registerSection.style.display = 'none';
          if (loginSection) loginSection.style.display = 'block';
          if (infoText) infoText.textContent = 'У вас ещё нет аккаунта?';
          toggleBtn.textContent = 'Зарегистрироваться';
        } else {
          if (loginSection) loginSection.style.display = 'none';
          if (registerSection) registerSection.style.display = 'block';
          if (infoText) infoText.textContent = 'Уже есть аккаунт?';
          toggleBtn.textContent = 'Войти';
        }

        // Очищаем ошибки при переключении
        document.querySelectorAll('.form__error-message').forEach(el => {
          if (el) el.style.display = 'none';
        });
      });
    }

    // Валидация формы
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Получаем активную секцию
        const activeSection = isLoginForm ? loginSection : registerSection;
        if (!activeSection) return;

        // Валидация полей активной секции
        const inputs = activeSection.querySelectorAll('[data-validate]');

        inputs.forEach(input => {
          const rules = input.getAttribute('data-validate')?.split('|') || [];
          const errorElement = document.querySelector(`[data-error="${input.name}"]`);

          if (!errorElement) return;

          errorElement.style.display = 'none';

          // Проверка правил валидации
          for (const rule of rules) {
            if (rule === 'required' && (
              (input.type !== 'checkbox' && !input.value.trim()) ||
              (input.type === 'checkbox' && !input.checked)
            )) {
              errorElement.textContent = input.type === 'checkbox'
                ? 'Для завершения регистрации необходимо дать согласие'
                : 'Поле обязательно для заполнения';
              errorElement.style.display = 'block';
              isValid = false;
              break;
            }

            if (rule === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
              errorElement.textContent = 'Введите корректный email';
              errorElement.style.display = 'block';
              isValid = false;
              break;
            }
          }
        });

        if (isValid) {
          if (!isLoginForm) {
            // Для регистрации - показываем блок подтверждения
            const emailInput = activeSection.querySelector('input[name="email"]');
            if (emailInput && userEmailSpan && confirmationBlock && form) {
              userEmailSpan.textContent = emailInput.value;
              form.style.display = 'none';
              confirmationBlock.style.display = 'block';
              if (modalRightInfo) modalRightInfo.style.display = 'none';
            }
          } else {
            // Для входа - обычная отправка
            console.log('Форма входа отправлена');
          }
        }
      });
    }

    // Обработчик для кнопки входа в блоке подтверждения
    if (confirmationBtn && passwordInput && confirmationBlock && successBlock) {
      confirmationBtn.addEventListener('click', function() {
        if (!passwordInput.value.trim()) {
          if (passwordError) {
            passwordError.textContent = 'Введите пароль';
            passwordError.style.display = 'block';
          }
          return;
        }

        // Скрываем ошибку пароля
        if (passwordError) passwordError.style.display = 'none';

        // Скрываем блок подтверждения
        confirmationBlock.style.display = 'none';

        // Показываем блок успешной регистрации
        successBlock.style.display = 'block';

        // Через 800ms скрываем блок и перенаправляем
        setTimeout(function() {


          // После завершения анимации перенаправляем
          setTimeout(function() {
            window.location.href = '/personal-cabinet.html';
          }, 800);
        }, 800);
      });
    }

    // Скрытие ошибок при вводе
    if (form) {
      form.addEventListener('input', function(e) {
        const input = e.target;
        if (input.hasAttribute('data-validate')) {
          const errorElement = document.querySelector(`[data-error="${input.name}"]`);
          if (errorElement) {
            errorElement.style.display = 'none';
          }
        }
      });

      // Для чекбокса используем change
      form.addEventListener('change', function(e) {
        const input = e.target;
        if (input.type === 'checkbox' && input.hasAttribute('data-validate')) {
          const errorElement = document.querySelector(`[data-error="${input.name}"]`);
          if (errorElement) {
            errorElement.style.display = 'none';
          }
        }
      });
    }

    // Скрытие ошибки пароля при вводе
    if (passwordInput && passwordError) {
      passwordInput.addEventListener('input', function() {
        passwordError.style.display = 'none';
      });
    }
  });
