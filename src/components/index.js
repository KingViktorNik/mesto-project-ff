import '../pages/index.css';
import { createCard, deleteCard, likeToggle } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js'; 
import { setEventListeners, toggleButtonState } from './validation.js';

const pageСontent = document.querySelector('.page__content');
const placesList = document.querySelector('.places__list');

const  validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

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
const buttonsCloseModal = pageСontent.querySelectorAll('.popup__close');

// Переменные модального окна добавление новой карточки

const modalEditProfile = pageСontent.querySelector('.popup_type_edit');
const buttonSaveProfile = modalEditProfile.querySelector('.popup__button');

// Переменные модального окна редактирования профиля

const modalNewCard = pageСontent.querySelector('.popup_type_new-card');
const buttonSaveCard = modalNewCard.querySelector('.popup__button');

// Переменные модального окна просмотра изображения

const popupTypeImageCard = pageСontent.querySelector('.popup_type_image');
const popupImage = popupTypeImageCard.querySelector('.popup__image');
const popupCaption = popupTypeImageCard.querySelector('.popup__caption');

// Функция добавления новой карточки

function openAddCardModal(evt) {
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

function enableValidation ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const validationConfig = {inputSelector,
                            submitButtonSelector,
                            inactiveButtonClass,
                            inputErrorClass,
                            errorClass,
  }
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => setEventListeners(form, validationConfig));
};

function clearValidation (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const spanList = Array.from(form.querySelectorAll(`.${config.errorClass}`));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);

  inputList.forEach(element => element.classList.remove(config.inputErrorClass));
  spanList.forEach(element => element.textContent = '');
}

buttonEditProfile.addEventListener('click', () => {
  const nameInput = formProfile.elements.name;
  const jobInput = formProfile.elements.description;

  nameInput.value = profile.name.textContent;
  jobInput.value = profile.job.textContent;

  clearValidation(modalEditProfile, validationConfig);
  openModal(modalEditProfile);
});
buttonSaveProfile.addEventListener('click', handleSubmitProfile);

buttonAddCard.addEventListener('click', () => {
  clearValidation(modalNewCard, validationConfig);
  openModal(modalNewCard)
});
buttonSaveCard.addEventListener('click', openAddCardModal);

buttonsCloseModal.forEach(button => button.addEventListener('click', closeModal));

initialCards.forEach(card => placesList.append(createCard(card, deleteCard, likeToggle, openModalImageCard)));

// Вызовем функцию волидации форм
enableValidation(validationConfig);