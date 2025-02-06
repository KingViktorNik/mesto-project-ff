// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(name, link, delCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const placesItem = cardElement.querySelector('.places__item');
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');

  placesItem.querySelector('.card__title').textContent = name;
  placesItem.querySelector('.card__image').src = link;
  
  cardDeleteButton.addEventListener('click', delCard);
  
  return cardElement;
}

// @todo: Вывести карточки на страницу

initialCards.forEach(card => placesList.append(addCard(card.name, card.link, delCard)));

// @todo: Функция удаления карточки

function delCard(event) {
  event.target.parentElement.remove();
}
