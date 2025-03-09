// Функции для работы с карточками проекта Mesto
// Функции, обрабатывающие события лайка и удаления карточки

// в файле card.js описаны функции для работы с карточками: функция создания карточки, 
// функции-обработчики событий удаления и лайка карточки;

// @todo: Темплейт карточки

import { openPopup } from './modal.js';
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function addCard(card, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const placesItem = cardElement.querySelector('.places__item');
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  const cardImage = placesItem.querySelector('.card__image');

  placesItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardDeleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openPopup);

  return placesItem;
}

// @todo: Функция удаления карточки

export function deleteCard(event) {
  event.target.parentElement.remove();
}
