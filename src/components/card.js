// Функции для работы с карточками проекта Mesto
// Функции, обрабатывающие события лайка и удаления карточки

// в файле card.js описаны функции для работы с карточками: функция создания карточки, 
// функции-обработчики событий удаления и лайка карточки;

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

function addCard(name, imageLink, imageAlt, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const placesItem = cardElement.querySelector('.places__item');
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  const cardImage = placesItem.querySelector('.card__image');

  placesItem.querySelector('.card__title').textContent = name;
  cardImage.src = imageLink;
  cardImage.alt = imageAlt;

  cardDeleteButton.addEventListener('click', deleteCard);
  
  return placesItem;
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  event.target.parentElement.remove();
}


export { addCard, deleteCard }