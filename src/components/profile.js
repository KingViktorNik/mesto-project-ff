
import { closePopup } from "./modal";
const popupEypeEdit = document.querySelector('.popup_type_edit');
const profileInfo = document.querySelector('.profile__info');
const formProfile = document.forms['edit-profile'];

const profile = {
  name: profileInfo.querySelector('.profile__title').textContent,
  job: profileInfo.querySelector('.profile__description').textContent,
}

// функция редактирования профиля 

export function editProfile() {
  const nameInput = formProfile.elements.name;
  const jobInput = formProfile.elements.description;

  nameInput.value = profile.name;
  jobInput.value = profile.job;
  
  formProfile.addEventListener('submit', handleFormSubmit);
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  profile.name = formProfile.name.value;
  profile.job = formProfile.description.value;

  profileInfo.querySelector('.profile__title').textContent = profile.name;
  profileInfo.querySelector('.profile__description').textContent = profile.job;

  console.log('отпаравка формы');
  popupEypeEdit.dispatchEvent( new Event('click', closePopup));
}