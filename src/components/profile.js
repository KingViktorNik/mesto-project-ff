// в файле profile.js описаны функции для работы с профилем:

import { closeModal } from "./modal";

const popupEypeEdit = document.querySelector('.popup_type_edit');
const profileInfo = document.querySelector('.profile__info');
const formProfile = document.forms['edit-profile'];

const profile = {
  name: profileInfo.querySelector('.profile__title').textContent,
  job: profileInfo.querySelector('.profile__description').textContent,
}

// @todo: Функция редактирования профиля

export function editProfile() {
  const nameInput = formProfile.elements.name;
  const jobInput = formProfile.elements.description;

  nameInput.value = profile.name;
  jobInput.value = profile.job;
  
  formProfile.addEventListener('submit', handleFormSubmit);
}

// @todo: Обработчик «отправки» формы

function handleFormSubmit(evt) {
  evt.preventDefault();

  profile.name = formProfile.name.value.trim();
  profile.job = formProfile.description.value.trim();

  profileInfo.querySelector('.profile__title').textContent = profile.name;
  profileInfo.querySelector('.profile__description').textContent = profile.job;

  popupEypeEdit.dispatchEvent( new Event('click', closeModal));
}
