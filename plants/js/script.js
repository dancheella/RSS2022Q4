//burger menu
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

//prices accordion
const itemsPrices = document.querySelectorAll('.prices__item'); // Выборка всех элементов с классом prices__item из документа.
const accordion = document.querySelectorAll('.prices__accordion'); // Выборка всех элементов с классом prices__accordion из документа.

accordion.forEach((prices) => {
    prices.addEventListener('click', () => { // Навешивается событие click.
        if (prices.classList.contains('active')) { // Проверка, есть ли у текущего элемента класс "active".
            prices.classList.remove('active'); // Если есть класс "active", то класс удаляется и у родительского элемента тоже удаляется класс "active".
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

//button
const learnMore = document.getElementById("learnMore");
learnMore.addEventListener("click", function () {
    window.location.href = "#service";
});
const priceButton = document.getElementById("priceButton");
priceButton.addEventListener("click", function () {
    window.location.href = "#contacts";
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

/* Contacts */
const card = [
    {
        city: 'Yonkers, NY',
        phone: '+1 914 678 0003',
        address: '511 Warburton Ave',
    },
    {
        city: 'Canandaigua, NY',
        phone: '+1 585 393 0001',
        address: '151 Charlotte Street',
    },
    {
        city: 'Sherrill, NY',
        phone: '+1 315 908 0004',
        address: '14 WEST Noyes BLVD',
    },
    {
        city: 'New York City',
        phone: '+1 212 456 0002',
        address: '9 East 91st Street',
    },
]
const select = document.querySelector('.contacts__select');
const title = document.querySelector('.contacts__select-title');
const contacts = document.querySelector('.contacts__block');
const itemsContacts = document.querySelectorAll('.contacts__item');
const contactsCard = document.querySelector('.contacts__card');
const contactsCity = document.querySelector('.contacts__city');
const contactsPhone = document.querySelector('.contacts__phone');
const contactsAddress = document.querySelector('.contacts__address');
const contactsLink = document.querySelector('.contacts__link');

select.addEventListener('click', () => {
    if (contacts.classList.contains('active')) contacts.classList.remove('active');
    else contacts.classList.add('active');
});

/* select*/
itemsContacts.forEach((i) => {
    i.addEventListener('click', function() {
        title.textContent = this.textContent;
        contacts.classList.remove('active');
        title.classList.add('open');
        contactsCard.classList.add('active');
        select.classList.add('open');
        /* card */
        contactsCity.textContent = this.textContent;
        card.forEach(i => {
            if (i.city === this.textContent) {
                contactsPhone.textContent = i.phone;
                contactsAddress.textContent = i.address;
                contactsLink.setAttribute("href", "tel:"+i.phone.replace(/ /g,''));
            }
        });
    });
});

// смена фокуса service
const gardenButton = document.getElementById('gardens');
const lawnButton = document.getElementById('lawn');
const plantingButton = document.getElementById('planting');

const gardensItems = [...document.querySelectorAll('.garden')];
const lawnItems = [...document.querySelectorAll('.lawn')];
const plantingItems = [...document.querySelectorAll('.planting')];

let listActiveButtons = [];
let isActiveGardenButton = false;
let isActiveLawnButton = false;
let isActivePlantingButton = false;

function toggleBlurAllServiceItems() {
    toggleBlurItems(gardensItems, isActiveGardenButton);
    toggleBlurItems(lawnItems, isActiveLawnButton);
    toggleBlurItems(plantingItems, isActivePlantingButton);
}

function toggleBlurItems(items, isActiveItems) {
    if (isActiveItems) {
        items.forEach(el => {
            el.style = 'filter: blur(0px)';
            el.classList.remove('disable-hover');
        })
    } else {
        items.forEach(el => {
            el.style = 'filter: blur(2px)';
            el.classList.add('disable-hover');
        })
    }
}
//service__buttons
gardenButton.addEventListener("click", function (e) {
    if (isActiveGardenButton) {
        isActiveGardenButton = false;
        gardenButton.classList.remove('active-button');

        let index = listActiveButtons.indexOf(gardenButton);
        if (index !== -1) {
            listActiveButtons.splice(index, 1);
        }

        if (isActiveLawnButton || isActivePlantingButton) {
            toggleBlurItems(gardensItems, false);
        } else {
            toggleBlurItems(gardensItems, true);
            toggleBlurItems(lawnItems, true);
            toggleBlurItems(plantingItems, true);
        }
    } else {
        if (listActiveButtons.length < 2 && !listActiveButtons.includes(gardenButton)) {
            gardenButton.classList.add('active-button');
            isActiveGardenButton = true;
            listActiveButtons.push(gardenButton);

        } else if (listActiveButtons.length >= 2 && !listActiveButtons.includes(gardenButton)) {
            if (listActiveButtons[0] === lawnButton) {
                isActiveLawnButton = false;
            } else if (listActiveButtons[0] === plantingButton) {
                isActivePlantingButton = false;
            }
            listActiveButtons[0].classList.remove('active-button');

            gardenButton.classList.add('active-button');
            isActiveGardenButton = true;
            listActiveButtons = listActiveButtons.slice(1);
            listActiveButtons.push(gardenButton);
        }
        toggleBlurAllServiceItems();
    }
});

lawnButton.addEventListener("click", function (e) {
    if (isActiveLawnButton) {
        isActiveLawnButton = false;
        lawnButton.classList.remove('active-button');

        let index = listActiveButtons.indexOf(lawnButton);
        if (index !== -1) {
            listActiveButtons.splice(index, 1);
        }

        if (isActiveGardenButton || isActivePlantingButton) {
            toggleBlurItems(lawnItems, false);
        } else {
            toggleBlurItems(gardensItems, true);
            toggleBlurItems(lawnItems, true);
            toggleBlurItems(plantingItems, true);
        }
    } else {
        if (listActiveButtons.length < 2 && !listActiveButtons.includes(lawnButton)) {
            lawnButton.classList.add('active-button');
            isActiveLawnButton = true;
            listActiveButtons.push(lawnButton);

        } else if (listActiveButtons.length >= 2 && !listActiveButtons.includes(lawnButton)) {
            if (listActiveButtons[0] === gardenButton) {
                isActiveGardenButton = false;
            } else if (listActiveButtons[0] === plantingButton) {
                isActivePlantingButton = false;
            }
            listActiveButtons[0].classList.remove('active-button');

            lawnButton.classList.add('active-button');
            isActiveLawnButton = true;
            listActiveButtons = listActiveButtons.slice(1);
            listActiveButtons.push(lawnButton);
        }
        toggleBlurAllServiceItems();
    }

});

plantingButton.addEventListener("click", function (e) {
    if (isActivePlantingButton) {
        isActivePlantingButton = false;
        plantingButton.classList.remove('active-button');

        let index = listActiveButtons.indexOf(plantingButton);
        if (index !== -1) {
            listActiveButtons.splice(index, 1);
        }

        if (isActiveLawnButton || isActiveGardenButton) {
            toggleBlurItems(plantingItems, false);
        } else {
            toggleBlurItems(gardensItems, true);
            toggleBlurItems(lawnItems, true);
            toggleBlurItems(plantingItems, true);
        }
    } else {
        if (listActiveButtons.length < 2 && !listActiveButtons.includes(plantingButton)) {
            plantingButton.classList.add('active-button');
            isActivePlantingButton = true;
            listActiveButtons.push(plantingButton);
        } else if (listActiveButtons.length >= 2 && !listActiveButtons.includes(plantingButton)) {
            if (listActiveButtons[0] === lawnButton) {
                isActiveLawnButton = false;
            } else if (listActiveButtons[0] === gardenButton) {
                isActiveGardenButton = false;
            }
            listActiveButtons[0].classList.remove('active-button');

            plantingButton.classList.add('active-button');
            isActivePlantingButton = true;
            listActiveButtons = listActiveButtons.slice(1);
            listActiveButtons.push(plantingButton);
        }
        toggleBlurAllServiceItems();
    }
});