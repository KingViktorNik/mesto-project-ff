// Работу модальных окон
// Оттуда экспортируйте функции openModal и closeModal, 
// принимающие в качестве аргумента DOM-элемент модального окна, 
// с которым нужно произвести действие.


//в файле modal.js описаны функции для работы с модальными окнами: 
// функция открытия модального окна, функция закрытия модального окна, 
// функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею;

const pageContent= document.querySelector('.page__content');

export function openPopup(event) {
  if (event.target.classList.contains('profile__add-button')) {
    openPopupNewCard();
  };

  if (event.target.classList.contains('profile__edit-button')) {
    const profileInfo = pageContent.querySelector('.profile__info');
    const profile = {
      name: profileInfo.querySelector('.profile__title').textContent,
      description: profileInfo.querySelector('.profile__description').textContent,
    }

    openPopupEdit(profile);
  };

  if (event.target.classList.contains('card__image')) {
    event.stopPropagation();
    const cardImage = {
      src: event.target.src,
      description: event.target.parentElement.querySelector('.card__description').textContent,
    }

    openPopupImageCard(cardImage);
  };
  
}

function openPopupEdit(profile) {
  const popupTypeEdit = pageContent.querySelector('.popup_type_edit');
  const formProfile = popupTypeEdit.querySelector('.popup__form');
  

  formProfile.elements.name.value = profile.name;
  formProfile.elements.description.value = profile.description;
  
  popupTypeEdit.style.display = 'flex';
  
  popupTypeEdit.addEventListener('click', evt => closePopup(popupTypeEdit, evt));
  popupTypeEdit.parentElement.addEventListener('keydown', evt => closePopup(popupTypeEdit, evt));
}

function openPopupNewCard(event) {
  const popupTypeNewCard = pageContent.querySelector('.popup_type_new-card');
  
  popupTypeNewCard.style.display = 'flex';
  
  popupTypeNewCard.addEventListener('click', evt => closePopup(popupTypeNewCard, evt));
  popupTypeNewCard.parentElement.addEventListener('keydown', evt => closePopup(popupTypeNewCard, evt));
}

function openPopupImageCard(cardImage) {
  const popupTypeImageCard = pageContent.querySelector('.popup_type_image');
  const popupImage = popupTypeImageCard.querySelector('.popup__image');
  const popupCaption = popupTypeImageCard.querySelector('.popup__caption');

  popupImage.src = cardImage.src;
  popupCaption.textContent = cardImage.description;
  
  popupTypeImageCard.style.display = 'flex';

  popupTypeImageCard.addEventListener('click', evt => closePopup(popupTypeImageCard, evt));
  popupTypeImageCard.parentElement.parentElement.addEventListener('keydown', evt => closePopup(popupTypeImageCard, evt));
}

function closePopup(namePopup, event) {
  const isElementClick = event.target.classList.contains('popup__close') || event.target.classList.contains('popup');
  if(event.key === 'Escape' || isElementClick) {
    namePopup.style.display = 'none';
    namePopup.removeEventListener('click', closePopup);
    namePopup.removeEventListener('keydown', closePopup);
  }

}
