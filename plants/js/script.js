//Burger menu
const menu = document.querySelector('.menu__body')
const menuBtn = document.querySelector('.header__burger')
const body = document.body;

if (menu && menuBtn) {
    menuBtn.addEventListener('click', e => {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })
    menu.addEventListener('click', e => {
        if (e.target.classList.contains('menu__body')) {
            menu.classList.remove('active')
            menuBtn.classList.remove('active')
            body.classList.remove('lock')
        }
    })
    menu.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active')
            menuBtn.classList.remove('active')
            body.classList.remove('lock')
        })
    })
}

//prices accourdion
const itemsPrices = document.querySelectorAll('.prices__item'); // Выборка всех элементов с классом prices__item из документа.
const accordion = document.querySelectorAll('.prices__accordion'); // Выборка всех элементов с классом prices__accordion из документа.

accordion.forEach((prices) => {
    prices.addEventListener('click', () => { // Навешивается событие click.
        if (prices.classList.contains('active')) { // Проверка, есть ли у текущего элемента класс "active".
            prices.classList.remove('active'); // Если есть класс "active", то класс удаляется и у родительского элемента тоже удаляется класс"active".
            prices.parentElement.classList.remove('active');
        } else {
            itemsPrices.forEach(i => i.classList.remove('active'));
            accordion.forEach(i => i.classList.remove('active'));
            prices.classList.add('active');
            prices.parentElement.classList.add('active');
        } //Если же класса "active" нет, то из всех элементов "itemsPrices" и "accordion" удаляется класс "active",
        // а затем добавляется класс "active" для текущего элемента "accordion" и его родителя.
    });
});

//button order
const basicsLink = document.getElementById("basicsLink");
const standardLink = document.getElementById("standardLink");
const proLink = document.getElementById("proLink");

basicsLink.addEventListener("click", function () {
    window.location.href = "#contacts";
});
standardLink.addEventListener("click", function () {
    window.location.href = "#contacts";
});
proLink.addEventListener("click", function () {
    window.location.href = "#contacts";
});


