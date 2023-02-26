// Время выводится в 24-часовом формате
function showTime() {
    const date = new Date();// Получаем текущую дату и время
    const currentTime = date.toLocaleTimeString();// Из строки с датой и временем получаем только время
    const time = document.querySelector('.time');// Находим элемент с классом time
    time.textContent = currentTime;// Вывод данных на страницу
    setTimeout(showTime, 1000);// Обновление времени каждую секунду
    showData();
    getTimeOfDay()
    showGreeting();
}

showTime();

// Выводится день недели, число, месяц
function showData() {
    const date = new Date();
    const options = {weekday: "long", month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    const newDate = document.querySelector('.date')
    newDate.textContent = currentDate;
}

// Возвращает время суток (morning, afternoon, evening, night) в зависимости от текущего времени в часах
function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    switch (true) {
        case (hours >= 6 && hours < 12):
            return 'morning';
        case (hours >= 12 && hours < 18):
            return 'afternoon';
        case (hours >= 18 && hours < 24):
            return 'evening';
        default:
            return 'night';
    }
}

// Текст приветствия изменяется в зависимости от времени суток
function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    const greetingElement = document.querySelector('.greeting');
    greetingElement.textContent = greetingText;
}

const name = document.querySelector('.name');
name.placeholder = '[Enter name]';

// Сохранение данных
const setLocalStorage = () => {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
};
window.addEventListener('beforeunload', setLocalStorage);

// Восстановление и отображение
const getLocalStorage = () => {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    } else {
        city.value = 'Minsk';
    }
    getWeather();
};
window.addEventListener('load', getLocalStorage);


let body = document.querySelector('body')

//Возвращает рандомное число от 1 до 20 включительно.
function getRandomNum() {
    return Math.floor(Math.random() * 20) + 1;
}

function setBg() {
    let bgNum = String(getRandomNum()).padStart(2, '0');
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/dancheella/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url('${img.src}')`;
    });
}

setBg();

let randomNum;

//Функции getSlideNext() и getSlidePrev() увеличивают и уменьшают глобальную переменную randomNum на единицу.
function getSlideNext() {
    if (randomNum === 20) {
        randomNum = 1;
    } else {
        randomNum++;
    }
    setBg();
}

function getSlidePrev() {
    if (randomNum === 1) {
        randomNum = 20;
    } else {
        randomNum--;
    }
    setBg();
}

const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);

const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

//ВИДЖЕТ ПОГОДЫ
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error')

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=8bdbb0ce62bdee8a0df52cb1c1abef62&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    city.placeholder = '[Enter city]';

    try {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = 'Temperature: ' + Math.ceil(`${data.main.temp}`) + ' °C';
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        weatherError.textContent = '';
    } catch (err) {
        weatherIcon.className = 'weather-icon owf'
        weatherError.textContent = `Error! Nothing to geocode for '${city.value}'`;
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
}

city.addEventListener('change', getWeather);

//ЦИТАТЫ
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
    const quotes = 'assets/json/data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    const quoteNumber = Math.floor(Math.random() * data.length);
    quote.textContent = data[quoteNumber].text;
    author.textContent = data[quoteNumber].author;

    changeQuote.addEventListener('click', function () {
        const quoteNum = Math.floor(Math.random() * data.length);
        quote.textContent = data[quoteNum].text;
        author.textContent = data[quoteNum].author;
    });
}

getQuotes();

//ПЛЕЕР
import playList from './playList.js';

const audio = new Audio();
let isPlay = false;
let playNum = 0;

//Создание плейлиста
const playLists = document.querySelector('.play-list');

playList.forEach(item => { // перебираем массив playList и создаем элементы li для каждого трека
    const listItem = document.createElement('li'); // создаем новый элемент li
    listItem.classList.add('play-item'); // добавляем класс play-item
    listItem.textContent = item.title; // добавляем название трека
    playLists.append(listItem); // добавляем элемент li в элемент ul с классом play-list
});

//Воспроизведение музыки
const playItems = document.querySelectorAll('.play-item');
const playButton = document.querySelector('.play');
const durationItem = document.querySelector('.duration');
const title = document.querySelector('.song-name');
function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = playNum;
    playItems[playNum].classList.add('item-active'); //активный трек
    durationItem.innerText = `${playList[playNum].duration}`; //продолжительность трека
    title.innerText = `${playItems[playNum].textContent}`; //название активного трека
    if (!isPlay) {
        audio.play();
        isPlay = true;
        setTimer();
    } else {
        audio.pause();
        clearTimeout(setTimer);
        isPlay = false;
    }
}
playButton.addEventListener('click', playAudio);

//Изменение стиля кнопки при клике
function toggleBtn() {
    if (isPlay) {
        playButton.classList.add('pause');
    } else {
        playButton.classList.remove('pause');
    }
}
playButton.addEventListener('click', toggleBtn);

//Следующий трек
const playNextButton = document.querySelector('.play-next');

function playNext() {
    playItems[playNum].classList.remove('item-active');
    if (playNum === playList.length - 1) {
        playNum = -1;
    }
    playNum++;
    isPlay = false;
    playAudio();
    toggleBtn();
    return playNum;
}
playNextButton.addEventListener('click', playNext);

//Предыдущий трек
const playPrevButton = document.querySelector('.play-prev');

function playPrev() {
    playItems[playNum].classList.remove('item-active');
    if (playNum === 0) {
        playNum = playList.length;
    }
    playNum--;
    isPlay = false;
    playAudio();
    toggleBtn();
    return playNum;
}
playPrevButton.addEventListener('click', playPrev);

// Регулирует громкость
const soundVolume = document.querySelector('.sound-volume');

function volumeSound() {
    audio.volume = 0.5;
    audio.volume = soundVolume.value;
}
soundVolume.addEventListener('input', volumeSound);

// Таймер трека
const timerItem = document.querySelector('.timer');
function setTimer() {
    let sec = parseInt(audio.currentTime % 60);
    let min = parseInt((audio.currentTime / 60) % 60);
    if (sec < 10) {
        timerItem.innerHTML = min + ':0' + sec;
    }
    else {
        timerItem.innerHTML = min + ':' + sec;
    }
    setTimeout(setTimer, 1000);
    // setTimeout(getProgressWidth, 1000);
}





