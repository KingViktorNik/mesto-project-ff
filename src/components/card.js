// @todo: Функция создания карточки

export function createCard(card, userId, deleteCard, lickClick, openModalImage, openModalDeleteCard) {
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

  if (userId !== card.idAuthor) {
    cardDeleteButton.classList.add('card__delete-button-hide');
    
  } else {
    cardDeleteButton.classList.remove('card__delete-button-hide');
  }

  if (card.like) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardDeleteButton.addEventListener('click', () => openModalDeleteCard({card, placesItem}));
  likeButton.addEventListener('click', evt => {
    lickClick(card, cardLikes);
    if (card.like) {
      card.like = false;
    } else {
      card.like = true;
    }
  });
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
