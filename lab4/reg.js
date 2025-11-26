// app.js

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
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы
            
            // Получаем значения из формы
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const agree = document.getElementById('agree').checked;
            
            // Создаем объект пользователя
            const user = new User(email, password, agree);
            
            // Вызываем метод вывода в консоль
            user.displayToConsole();
            
            // Здесь можно добавить отправку данных на сервер
            // this.submit(); // Раскомментируйте, если нужно отправить форму на сервер
        });
    }
});