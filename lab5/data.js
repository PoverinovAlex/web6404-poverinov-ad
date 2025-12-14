// Функция загрузки данных с сервера
async function loadUnitsData() {
    const container = document.querySelector('.units-container');
    if (!container) return;

    try {
        // Используем mock-json-server (локальный или внешний)
        const response = await fetch('http://localhost:3000/units');
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }
        
        const units = await response.json();
        displayUnits(units);
        
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        container.innerHTML = `
            <div class="error-message">
                <h3>Ошибка загрузки данных</h3>
                <p>${error.message}</p>
                <p>Пожалуйста, проверьте подключение к серверу.</p>
            </div>
        `;
    }
}

// Функция отображения юнитов
function displayUnits(units) {
    const container = document.querySelector('.units-container');
    container.innerHTML = '';
    
    units.forEach(unit => {
        const unitDiv = document.createElement('div');
        unitDiv.innerHTML = `
            <h1>${unit.name}</h1>
            <p>${unit.description}</p>
            <p>Тип урона: <strong><i>${unit.damageType}</i></strong></p>
            <img src="${unit.imageUrl}" width="300" height="200" alt="${unit.name}">
        `;
        container.appendChild(unitDiv);
    });
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем данные сразу
    loadUnitsData();
    
    // И затем каждые 5 минут
    setInterval(loadUnitsData, 5 * 60 * 1000);
});