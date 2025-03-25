import { data } from 'autoprefixer';
import '../pages/index.css';
import { createCard, deleteCard, likeToggle } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js'; 
import { enableValidation, toggleButtonState } from './validation.js';

const pageСontent = document.querySelector('.page__content');
const placesList = document.querySelector('.places__list');

const user = {
  token: '9a6aeb5f-5827-4768-8d6b-54e318fb40d2',
  cohortId: 'wff-cohort-35',
};

const  validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const profile = {
  id: null,
  cohort: null,
  name: pageСontent.querySelector('.profile__title'),
  job: pageСontent.querySelector('.profile__description'),
  avatar: pageСontent.querySelector('.profile__image'),
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

// Переменные модального окна удаления карточки

const modalDeleteCard = pageСontent.querySelector('.popup_type_delete-card');
const buttonDeleteCard = modalDeleteCard.querySelector('.popup__button');

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
  fetch(`https://nomoreparties.co/v1/${user.cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: user.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  })
  .then(data => {
    card.id = data['_id'];
    card.name = data.name;
    card.link = data.link;
    card.alt = data.link;
    card.likeCounter = data.likes.length;
    card.idAuthor = data.owner['_id'];
    placesList.prepend(createCard(card, profile.id, deleteCard, lickClick, openModalImageCard, openModalDeleteCard));
  });
  
  nameInput.value = '';
  linkInput.value = '';

  closeModal();
}

// Обработчик «отправки» формы

function handleSubmitProfile(evt) {
  evt.preventDefault();
  
  fetch(`https://nomoreparties.co/v1/${user.cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: user.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formProfile.name.value.trim(),
      about: formProfile.description.value.trim()
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  })
  .then(data => {
    profile.name.textContent = data.name;
    profile.job.textContent = data.about;
  });

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

// Функция модального окна удаление карточки

let handleSubmitConfirmPopup = null;
function openModalDeleteCard(card) {
  handleSubmitConfirmPopup = card;
  openModal(modalDeleteCard);
}

buttonDeleteCard.addEventListener('click', () => {
  console.log(`удаляем карточку ${handleSubmitConfirmPopup.card.id}`);
  deleteCard(handleSubmitConfirmPopup.placesItem);
  fetch(`https://nomoreparties.co/v1/${user.cohortId}/cards/${handleSubmitConfirmPopup.card.id}`, {
    method: 'DELETE',
    headers: {
      authorization: user.token
    }
  })
  closeModal();
});

function clearValidation(form, config) {
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
  formPlace.elements['place-name'].value = '';
  formPlace.elements.link.value = '';
  
  clearValidation(modalNewCard, validationConfig);
  openModal(modalNewCard)
});
buttonSaveCard.addEventListener('click', openAddCardModal);

buttonsCloseModal.forEach(button => button.addEventListener('click', closeModal));

// initialCards.forEach(card => placesList.append(createCard(card, user.id, deleteCard, likeToggle, openModalImageCard)));

// Вызовем функцию волидации форм
enableValidation(validationConfig);

fetch(`https://nomoreparties.co/v1/${user.cohortId}/users/me`, {
  method: 'GET',
  headers: {
    authorization: user.token
  }
})
.then(res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
})
.then(data => {
  const profile = {
    name: data.name,
    about: data.about,
    avatar: data.avatar,
    id: data['_id'],
    cohort: data.cohort
  }
  setProfile(profile);
})
.catch(err => console.log('Ошибка. Запрос не выполнен: ', err));

fetch(`https://nomoreparties.co/v1/${user.cohortId}/cards`, {
  method: 'GET',
  headers: {
    authorization: user.token
  }
})
.then(res => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
})
.then(data => 
  data.forEach (elemetnt => {
    const card = {
      id: elemetnt['_id'],
      name: elemetnt.name,
      link: elemetnt.link,
      alt: elemetnt.name,
      likeCounter: elemetnt.likes.length,
      idAuthor:elemetnt.owner['_id'],
      like: Array.from(elemetnt.likes).some(like => like['_id'] === profile.id)
    }
    // const hasInvalidInput = (inputList) => inputList.some(inputElement => !inputElement.validity.valid);
    placesList.append(createCard(card, profile.id, deleteCard, lickClick, openModalImageCard, openModalDeleteCard));
  })  
) // если мы попали в этот then, data — это объект
.catch(err => console.log('Ошибка. Запрос не выполнен: ', err));

function setProfile({ name, about, avatar, id, cohort }) {
  profile.id = id;
  profile.name.textContent = name;
  profile.job.textContent = about;
  profile.avatar.src = avatar;
  profile.cohort = cohort;
}

function lickClick(card, cardLikes) {
  if (!card.like) {  
    fetch(`https://nomoreparties.co/v1/${user.cohortId}/cards/likes/${card.id}`, {
      method: 'PUT',
      headers: {
        authorization: user.token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .then(data => likeToggle(cardLikes, data.likes.length));
  } else {
    fetch(`https://nomoreparties.co/v1/${user.cohortId}/cards/likes/${card.id}`, {
      method: 'DELETE',
      headers: {
        authorization: user.token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .then(data => likeToggle(cardLikes, data.likes.length));
  }
  
}