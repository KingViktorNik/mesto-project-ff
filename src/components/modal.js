//в файле modal.js описаны функции для работы с модальными окнами:

import { addCard } from "./card";
import { editProfile } from "./profile";

const pageContent = document.querySelector('.page__content');
let popupSelected = null;

// @todo: Функция открытия модального окна

export function openModal(evt) {
  const buttonClicked  = evt.target.classList;

  // Если нажата кнопка добавление новой карточки

  if (buttonClicked.contains('profile__add-button')) {
    popupSelected = pageContent.querySelector('.popup_type_new-card');
    popupSelected.addEventListener('submit', addCard);
  };
  
  // Если нажата кнопка редактирования профиля
  
  if (buttonClicked.contains('profile__edit-button')) {
    popupSelected = pageContent.querySelector('.popup_type_edit');
    editProfile();
  };

  // Если нажали на изображение карточки

  if (buttonClicked.contains('card__image')) {
    popupSelected = pageContent.querySelector('.popup_type_image');
    openModalImageCard(evt);
  };

  if (popupSelected) {
    popupSelected.classList.add('popup_is-opened');
    popupSelected.addEventListener('click', closeModal);
    popupSelected.parentElement.parentElement.addEventListener('keydown', closeModal);
  }
}

// @todo: Функция закрытия модального окна

export function closeModal(evt) {
  if(!popupSelected || (evt.key !== 'Escape' && evt.type !== 'click')) {
    return
  }

  const isModalClosed = evt.target.classList.contains('popup__close') ||       // Сработал ли click по кнопке
                        evt.target.classList.contains('popup_is-opened') ||    // Сработал ли click мимо формы
                        evt.code === 'Escape';                                 // Нажата ли клавиша Escape

  if(isModalClosed && popupSelected) {
    popupSelected.classList.remove('popup_is-opened');
    popupSelected.removeEventListener('click', closeModal);
    popupSelected.removeEventListener('keydown', closeModal);
    popupSelected = null;
  }
}

// @todo: Функция просмотра карточки

function openModalImageCard(evt) {
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
