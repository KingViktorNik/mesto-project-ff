import '../pages/index.css';
import { createCard, deleteCard, likeToggle } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js'; 

const pageСontent = document.querySelector('.page__content');
const placesList = document.querySelector('.places__list');

const profile = {
  name: pageСontent.querySelector('.profile__title'),
  job: pageСontent.querySelector('.profile__description'),
}

// Переменные форм

const forms = document.forms;
const formPlace = forms['new-place'];
const formProfile = forms['edit-profile'];

// Переменные кнопок

const buttonEditProfile = pageСontent.querySelector('.profile__edit-button');
const buttonAddCard = pageСontent.querySelector('.profile__add-button');

// Переменные модальных окон

const modalNewCard = pageСontent.querySelector('.popup_type_new-card');
const modalEditProfile = pageСontent.querySelector('.popup_type_edit');
const popupTypeImageCard = pageСontent.querySelector('.popup_type_image');
const popupImage = popupTypeImageCard.querySelector('.popup__image');
const popupCaption = popupTypeImageCard.querySelector('.popup__caption');



// Функция добавления новой карточки

function newCard(evt) {
  evt.preventDefault();

  const nameInput = formPlace.elements['place-name'];
  const linkInput = formPlace.elements.link;
  
  const card = {
    name: nameInput.value,
    link: linkInput.value,
    alt: nameInput.value,
  }
  
  placesList.prepend(createCard(card, deleteCard, likeToggle, openModalImageCard));
  
  nameInput.value = '';
  linkInput.value = '';

  closeModal();
}

// Обработчик «отправки» формы

function handleSubmitProfile(evt) {
  evt.preventDefault();

  profile.name.textContent = formProfile.name.value.trim();
  profile.job.textContent = formProfile.description.value.trim();

  closeModal();
}

// Функция просмотра карточки

function openModalImageCard(evt) {
  evt.stopPropagation();
  const cardImage = {
    src: evt.target.src,
    description: evt.target.parentElement.querySelector('.card__description').textContent,
  }
    
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.description;
  popupCaption.textContent = cardImage.description;

  openModal(popupTypeImageCard);
}

// События на клавиши

buttonAddCard.addEventListener('click', () => {
  openModal(modalNewCard);

  const openPupup = pageСontent.querySelector('.popup_is-opened');
  const buttonSaveCard = openPupup.querySelector('.popup__button');

  buttonSaveCard.addEventListener('click', newCard);
});

buttonEditProfile.addEventListener('click', () => {
  const nameInput = formProfile.elements.name;
  const jobInput = formProfile.elements.description;

  nameInput.value = profile.name.textContent;
  jobInput.value = profile.job.textContent;

  openModal(modalEditProfile);

  const openPupup = pageСontent.querySelector('.popup_is-opened');
  const buttonSaveCard = openPupup.querySelector('.popup__button');

  buttonSaveCard.addEventListener('click', handleSubmitProfile);
});

initialCards.forEach(card => placesList.append(createCard(card, deleteCard, likeToggle, openModalImageCard)));
