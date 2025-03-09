// Функции для работы с карточками проекта Mesto
// Функции, обрабатывающие события лайка и удаления карточки

// в файле card.js описаны функции для работы с карточками: функция создания карточки, 
// функции-обработчики событий удаления и лайка карточки;

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function addCard(card, deleteCard, likeToggle, openPopup) {
  const cardElement = cardTemplate.cloneNode(true);
  const placesItem = cardElement.querySelector('.places__item');
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  const cardImage = placesItem.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  placesItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardDeleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openPopup);
  likeButton.addEventListener('click', likeToggle);

  return placesItem;
}

// @todo: Функция удаления карточки

export function deleteCard(event) {
  event.target.parentElement.remove();
}

export function likeToggle(evt) {
  const classLikeActive = 'card__like-button_is-active';

  if (evt.target.classList.contains(classLikeActive)) {
    evt.target.classList.remove(classLikeActive)
    return
  } 

  evt.target.classList.add(classLikeActive);
}
