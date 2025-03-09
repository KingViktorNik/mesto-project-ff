// Работу модальных окон
// Оттуда экспортируйте функции openModal и closeModal, 
// принимающие в качестве аргумента DOM-элемент модального окна, 
// с которым нужно произвести действие.

//в файле modal.js описаны функции для работы с модальными окнами: 
// функция открытия модального окна, функция закрытия модального окна, 
// функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею;

import { addCard, deleteCard } from "./card";
import { editProfile } from "./profile";

const pageContent = document.querySelector('.page__content');
let popupSelected = false; 

// функция открытия модального окна

export function openPopup(evt) {
  const buttonClicked  = evt.target.classList;

  // если нажата кнопка добовление новой карточки 

  if (buttonClicked.contains('profile__add-button')) {
    popupSelected = pageContent.querySelector('.popup_type_new-card');
    popupSelected.addEventListener('submit', newCard);
  };
  
  // если нажата кнопка редактирования профиля
  
  if (buttonClicked.contains('profile__edit-button')) {
    popupSelected = pageContent.querySelector('.popup_type_edit');
    editProfile();
  };

  // если нажали на изоброжение карточки

  if (buttonClicked.contains('card__image')) {
    popupSelected = pageContent.querySelector('.popup_type_image');
    openPopupImageCard(evt);
  };

  if (popupSelected) {
    popupSelected.classList.add('popup_is-opened');
    popupSelected.addEventListener('click', closePopup);
    popupSelected.parentElement.parentElement.addEventListener('keydown', closePopup);
  }
}

// функция закртытия модального окна

export function closePopup(evt) {
  if(!popupSelected || (evt.key !== 'Escape' && evt.type !== 'click')) {
    return
  }

  const isCloseElement = evt.target.classList.contains('popup__close') ||       // сработала clock по кнопие 
                         evt.target.classList.contains('popup_is-opened') ||    // сработала clock мимо формы
                         evt.code === 'Escape' ;                                 // нажата клавиша Escape

  if(isCloseElement && popupSelected) {
    popupSelected.classList.remove('popup_is-opened');
    popupSelected.removeEventListener('click', closePopup);
    popupSelected.removeEventListener('keydown', closePopup);
    popupSelected = false;
  }
}

// просмотр карточки

function openPopupImageCard(evt) {
  evt.stopPropagation();
  const cardImage = {
    src: evt.target.src,
    description: evt.target.parentElement.querySelector('.card__description').textContent,
  }

  const popupTypeImageCard = pageContent.querySelector('.popup_type_image');
  const popupImage = popupTypeImageCard.querySelector('.popup__image');
  const popupCaption = popupTypeImageCard.querySelector('.popup__caption');

  popupImage.src = cardImage.src;
  popupCaption.textContent = cardImage.description;
}

// функция добовления новой карточки 
function newCard(evt) {
  evt.preventDefault(); 
  const formPlace = document.forms['new-place'];
  const placesList = pageContent.querySelector('.places__list');

  const nameInput = formPlace.elements['place-name']; 
  const linkInput = formPlace.elements.link;
  
  const card = {
    name: nameInput.value,
    link: linkInput.value,
    alt: nameInput.value,
  }
  
  placesList.prepend(addCard(card, deleteCard));
  
  nameInput.value = '';
  linkInput.value = '';

  formPlace.parentElement.parentElement.dispatchEvent( new Event('click', closePopup));
}
