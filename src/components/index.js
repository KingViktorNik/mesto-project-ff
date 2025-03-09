// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.


// в файле index.js описана инициализация приложения и основная логика страницы: 
// поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, 
// функция-обработчик события открытия модального окна для редактирования профиля; функция открытия 
// модального окна изображения карточки.

// Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.

import '../pages/index.css';
import { addCard, deleteCard, likeToggle } from './card.js';
import initialCards from './cards.js';
import { openPopup } from './modal.js'; 

const pageСontent = document.querySelector('.page__content');
const placesList = document.querySelector('.places__list');


// @todo: Вывести карточки на страницу

initialCards.forEach(card => placesList.append(addCard(card, deleteCard, likeToggle)));
pageСontent.addEventListener('click', openPopup);


