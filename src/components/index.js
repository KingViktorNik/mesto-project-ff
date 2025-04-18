import '../pages/index.css';
import { createCard, deleteCard, likeToggle } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { makeCrudAPI } from './api.js';
import { showLoadingText } from './utills.js';

const pageСontent = document.querySelector('.page__content');
const placesList = document.querySelector('.places__list');
const profilePage = pageСontent.querySelector('.profile');

// Переменные форм

const forms = document.forms;
const formPlace = forms['new-place'];
const formProfile = forms['edit-profile'];
const formAvatar = forms['edit-profile-avatar'];

// Переменные кнопок

const buttonEditProfile = pageСontent.querySelector('.profile__edit-button');
const buttonAddCard = pageСontent.querySelector('.profile__add-button');
const buttonsCloseModal = pageСontent.querySelectorAll('.popup__close');
const imageAvatar = pageСontent.querySelector('.profile__image');

// Переменные модального окна редактирования профиля

const modalEditProfile = pageСontent.querySelector('.popup_type_edit');
const buttonSaveProfile = modalEditProfile.querySelector('.popup__button');

// Переменные модального окна редактирования аватара профиля

const modalEditAvatar = pageСontent.querySelector('.popup_type_edit_avatar');
const buttonSaveAvatar = modalEditAvatar.querySelector('.popup__button');

// Переменные модального окна добавление новой карточки

const modalNewCard = pageСontent.querySelector('.popup_type_new-card');
const buttonSaveCard = modalNewCard.querySelector('.popup__button');


// Переменные модального окна удаления карточки

const modalDeleteCard = pageСontent.querySelector('.popup_type_delete-card');
const buttonDeleteCard = modalDeleteCard.querySelector('.popup__button');

// Переменные модального окна просмотра изображения

const popupTypeImageCard = pageСontent.querySelector('.popup_type_image');
const popupImage = popupTypeImageCard.querySelector('.popup__image');
const popupCaption = popupTypeImageCard.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const profile = {
  name: pageСontent.querySelector('.profile__title'),
  job: pageСontent.querySelector('.profile__description')
}

const loadingText = 'Сохранение...';
let handleSubmitConfirmPopup = null;

// Обработчик «отправки» формы профиля

function handleSubmitProfile(evt) {
  evt.preventDefault();

  const newProfile = {
    name: formProfile.name.value.trim(),
    about: formProfile.description.value.trim()
  }

  const baseText = evt.target.textContent;
  buttonSaveProfile.textContent = showLoadingText(buttonSaveProfile.textContent, loadingText);
  makeCrudAPI.updateProfile(newProfile)
    .then(data => {
      profile.name.textContent = data.name;
      profile.job.textContent = data.about;
      closeModal(modalEditProfile);
    })
    .finally(() => {
      buttonSaveProfile.textContent = showLoadingText(buttonSaveProfile.textContent, baseText, loadingText)
    });
}

// Обработчик «отправки» формы с изменением аватар

function handleSubmitAvatar(evt) {
  evt.preventDefault();
  const avatar = {
    avatar: formAvatar.avatar.value
  };

  const baseText = evt.target.textContent;
  buttonSaveAvatar.textContent = showLoadingText(buttonSaveAvatar.textContent, loadingText);
  makeCrudAPI.checkUrlExists(avatar.avatar)
    .then(res => {
      if (res.isSuccessStatus && res.isImage) {
        makeCrudAPI.updateProfileAvatar(avatar)
          .then(profile => {
            imageAvatar.style['background-image'] = `url(${profile.avatar})`;
            closeModal(modalEditAvatar);
          })
          .catch(err => console.error(err));
      }
    })
    .catch(err => console.error(err))
    .finally(() => {
      buttonSaveAvatar.textContent = showLoadingText(buttonSaveAvatar.textContent, baseText, loadingText);
    })
}

// Обработчик «отправки» формы новой карточки

function handleSubmitCreateCard(evt) {
  evt.preventDefault();

  const nameInput = formPlace.elements['place-name'];
  const linkInput = formPlace.elements.link;

  const card = {
    name: nameInput.value,
    link: linkInput.value,
    alt: nameInput.value,
  }

  const baseText = evt.target.textContent;
  buttonSaveCard.textContent = showLoadingText(buttonSaveCard.textContent, loadingText);
  makeCrudAPI.createCard(card)
    .then(data => {
      card.id = data['_id'];
      card.name = data.name;
      card.link = data.link;
      card.alt = data.name;
      card.likeCounter = data.likes.length;
      card.idAuthor = data.owner['_id'];
      placesList.prepend(createCard(card, openModalDeleteCard, toggleVote, openModalImageCard));
      closeModal(modalNewCard);
      nameInput.value = '';
      linkInput.value = '';
    })
    .finally(() => {
      buttonSaveCard.textContent = showLoadingText(buttonSaveCard.textContent, baseText, loadingText);
    });

}

// Обработчик «отправки» статуса лайка

function toggleVote(card, cardLikes) {
  if (!card.isAutorLikeCard) {
    makeCrudAPI.likeCard(card.id)
      .then(data => {
        likeToggle(cardLikes, data.likes.length);
        card.isAutorLikeCard = true;
      })
      .catch(err => console.error(err));
  } else {
    makeCrudAPI.dislikeCard(card.id)
      .then(data => {
        likeToggle(cardLikes, data.likes.length);
        card.isAutorLikeCard = false;
      })
      .catch(err => console.error(err));
  }

}

// Функция модального окна удаление карточки

function openModalDeleteCard(card) {
  handleSubmitConfirmPopup = card;
  openModal(modalDeleteCard);
}

// Функция просмотра карточки

function openModalImageCard(evt) {
  evt.stopPropagation();
  const cardImage = {
    src: evt.target.src,
    description: evt.target.parentElement.querySelector('.card__title').textContent,
  }

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.description;
  popupCaption.textContent = cardImage.description;

  openModal(popupTypeImageCard);
}

Promise.all([makeCrudAPI.getProfile(), makeCrudAPI.getListCard()])
  .then(([profileNew, listCard]) => {
    profile.id = profileNew['_id'];
    profile.name.textContent = profileNew.name;
    profile.job.textContent = profileNew.about;
    profile.avatar = profileNew.avatar;
    imageAvatar.style['background-image'] = `url(${profileNew.avatar})`;

    listCard.forEach(element => {
      const card = {
        id: element['_id'],
        name: element.name,
        link: element.link,
        alt: element.name,
        likeCounter: element.likes.length,
        isAuthor: element.owner['_id'] !== profileNew['_id'],
        isAutorLikeCard: Array.from(element.likes).some(like => like['_id'] === profileNew['_id'])
      }
      placesList.append(createCard(card, openModalDeleteCard, toggleVote, openModalImageCard));
    })
  })
  .catch(error => console.error(error))
  .finally(() => {
    profilePage.classList.remove('profile__content-loader');
  });

buttonEditProfile.addEventListener('click', () => {
  const nameInput = formProfile.elements.name;
  const jobInput = formProfile.elements.description;

  nameInput.value = profile.name.textContent;
  jobInput.value = profile.job.textContent;

  clearValidation(modalEditProfile, validationConfig);
  openModal(modalEditProfile);
});
formProfile.addEventListener('submit', handleSubmitProfile);

imageAvatar.addEventListener('click', () => {
  formAvatar.avatar.value = profile.avatar;
  clearValidation(modalEditAvatar, validationConfig);
  openModal(modalEditAvatar);
});
formAvatar.addEventListener('submit', handleSubmitAvatar);

buttonAddCard.addEventListener('click', () => openModal(modalNewCard));
modalNewCard.addEventListener('submit', handleSubmitCreateCard);

buttonDeleteCard.addEventListener('click', () => {
  const baseText = buttonDeleteCard.textContent;
  buttonDeleteCard.textContent = showLoadingText(buttonDeleteCard.textContent, loadingText);
  makeCrudAPI.deleteCard(handleSubmitConfirmPopup.card.id)
    .then(() => {
      deleteCard(handleSubmitConfirmPopup.placesItem);
      closeModal(modalDeleteCard);
    })
    .finally(() => {
      buttonDeleteCard.textContent = showLoadingText(buttonDeleteCard.textContent, baseText, loadingText);
    });
});

buttonsCloseModal.forEach(button => button.addEventListener('click', () => closeModal(pageСontent.querySelector('.popup_is-opened'))));

// Вызовем функцию волидации форм
enableValidation(validationConfig);
