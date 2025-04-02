// @todo: Функция создания карточки

export function createCard(card, openModalDelete, lickClick, openModalImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const placesItem = cardElement.querySelector('.places__item');

  const cardImage = placesItem.querySelector('.card__image');
  const cardLikes = placesItem.querySelector('.card__like');

  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  placesItem.querySelector('.card__title').textContent = card.name;
  placesItem.querySelector('.card__like-counter').textContent = card.likeCounter;
  cardImage.src = card.link;
  cardImage.alt = card.alt;

  if (card.isAuthor) {
    cardDeleteButton.classList.add('card__delete-button-hide');
    
  } else {
    cardDeleteButton.classList.remove('card__delete-button-hide');
  }

  if (card.isAutorLikeCard) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardDeleteButton.addEventListener('click', () => openModalDelete({ card, placesItem }));
  likeButton.addEventListener('click', () => lickClick(card, cardLikes));
  cardImage.addEventListener('click', openModalImage);

  return placesItem;
}

// @todo: Функция удаления карточки

export function deleteCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки

export function likeToggle(cardLikes, likes) {
  const classLikeActive = 'card__like-button_is-active';
  const classLikeCounter = '.card__like-counter';
  const buttonLike = cardLikes.querySelector('.card__like-button');
  buttonLike.classList.toggle(classLikeActive);
  cardLikes.querySelector(classLikeCounter).textContent = likes;
}
