//в файле card.js описаны функции для работы с карточкой:

import { openModal, closeModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard(card, openModal, deleteCard, likeToggle) {
  const cardElement = cardTemplate.cloneNode(true);
  const placesItem = cardElement.querySelector('.places__item');
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  const cardImage = placesItem.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  placesItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardDeleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openModal);
  likeButton.addEventListener('click', likeToggle);

  return placesItem;
}

// @todo: Функция удаления карточки

export function deleteCard(event) {
  event.target.parentElement.remove();
}

// @todo: Функция лайка карточки

export function likeToggle(evt) {
  const classLikeActive = 'card__like-button_is-active';

  if (evt.target.classList.contains(classLikeActive)) {
    evt.target.classList.remove(classLikeActive)
    return
  } 

  evt.target.classList.add(classLikeActive);
}

// @todo: Функция добавления новой карточки

export function addCard(evt) {
  evt.preventDefault();

  const pageContent = document.querySelector('.page__content'); 
  const formPlace = document.forms['new-place'];
  const placesList = pageContent.querySelector('.places__list');

  const nameInput = formPlace.elements['place-name']; 
  const linkInput = formPlace.elements.link;
  
  const card = {
    name: nameInput.value,
    link: linkInput.value,
    alt: nameInput.value,
  }
  
  placesList.prepend(createCard(card, openModal, deleteCard, likeToggle));
  
  nameInput.value = '';
  linkInput.value = '';

  formPlace.parentElement.parentElement.dispatchEvent( new Event('click', closeModal));
}
