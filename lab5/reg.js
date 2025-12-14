// Класс для хранения данных пользователя
class User {
    constructor(email, password, agree) {
        this.email = email;
        this.password = password;
        this.agree = agree;
        this.timestamp = new Date().toLocaleString();
    }

    // Метод форматированного вывода в консоль
    displayToConsole() {
        console.log("=== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ===");
        console.log(`Email: ${this.email}`);
        console.log(`Пароль: ${this.password}`);
        console.log(`Согласие на обработку: ${this.agree ? 'Да' : 'Нет'}`);
        console.log(`Время регистрации: ${this.timestamp}`);
        console.log("============================");
    }
}

// Обработчик отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const agreeCheckbox = document.getElementById('agree');
    const submitBtn = document.querySelector('.submit-btn');

    // Создаем контейнеры для подсказок
    function createHintElement(input) {
        const hint = document.createElement('div');
        hint.className = 'hint';
        input.parentNode.appendChild(hint);
        return hint;
    }

    const emailHint = createHintElement(emailInput);
    const passwordHint = createHintElement(passwordInput);

    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Валидация пароля
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Обновление состояния кнопки
    function updateSubmitButton() {
        const emailValid = validateEmail(emailInput.value);
        const passwordValid = validatePassword(passwordInput.value);
        const agreeValid = agreeCheckbox.checked;

        submitBtn.disabled = !(emailValid && passwordValid && agreeValid);
    }

    // События ввода
    emailInput.addEventListener('input', function() {
        const email = emailInput.value;
        if (email === '') {
            emailHint.textContent = '';
            emailHint.style.color = '';
        } else if (!validateEmail(email)) {
            emailHint.textContent = 'Введите корректный email';
            emailHint.style.color = 'red';
        } else {
            emailHint.textContent = '✓ Email корректный';
            emailHint.style.color = 'green';
        }
        updateSubmitButton();
    });

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        if (password === '') {
            passwordHint.textContent = '';
            passwordHint.style.color = '';
        } else if (!validatePassword(password)) {
            passwordHint.textContent = 'Пароль должен быть не менее 6 символов';
            passwordHint.style.color = 'red';
        } else {
            passwordHint.textContent = '✓ Пароль подходит';
            passwordHint.style.color = 'green';
        }
        updateSubmitButton();
    });

    agreeCheckbox.addEventListener('change', updateSubmitButton);

    // Инициализация кнопки
    updateSubmitButton();

    // Обработчик отправки формы
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Получаем значения из формы
        const email = emailInput.value;
        const password = passwordInput.value;
        const agree = agreeCheckbox.checked;
        
        // Валидация перед отправкой
        if (!validateEmail(email) || !validatePassword(password) || !agree) {
            alert('Пожалуйста, заполните форму корректно');
            return;
        }

        // Создаем объект пользователя
        const user = new User(email, password, agree);
        
        // Вызываем метод вывода в консоль
        user.displayToConsole();

        // Отправка данных на сервер
        const formData = {
            email: email,
            password: password,
            agree: agree,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Ошибка отправки');
            
            const result = await response.json();
            console.log('Успешно отправлено:', result);
            alert('Данные успешно отправлены!');
            
            // Очистка формы
            loginForm.reset();
            emailHint.textContent = '';
            passwordHint.textContent = '';
            updateSubmitButton();
            
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке данных. Попробуйте снова.');
        }
    });
});