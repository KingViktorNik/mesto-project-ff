// @todo: Функция создания карточки

export function createCard(card, deleteCard, likeToggle, openModal) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const placesItem = cardElement.querySelector('.places__item');
  
  const cardImage = placesItem.querySelector('.card__image');

  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  placesItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.alt;

  cardDeleteButton.addEventListener('click', () => deleteCard(placesItem));
  likeButton.addEventListener('click', likeToggle);
  cardImage.addEventListener('click', openModal);

  return placesItem;
}

// @todo: Функция удаления карточки

export function deleteCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки

export function likeToggle(evt) {
  const classLikeActive = 'card__like-button_is-active';
  evt.target.classList.toggle(classLikeActive);
}
