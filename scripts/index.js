// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

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

// @todo: Вывести карточки на страницу

initialCards.forEach(card => placesList.append(addCard(card.name, card.link, card.alt, deleteCard)));

// @todo: Функция удаления карточки

function deleteCard(event) {
  event.target.parentElement.remove();
}
