// в файле modal.js описаны функции для работы с модальными окнами

const classModuleOpen= 'popup_is-opened';
let modalOpen = null;
let buttonClose = null;

// @todo: Функция открытия модального окна

export function openModal(modal) {
  buttonClose = modal.querySelector('.popup__close');
  modal.classList.add(classModuleOpen);
  buttonClose.addEventListener('click', closeModal);
  modal.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalKey);
  modalOpen = modal;
}

// @todo: Функция закрытия модального окна

export function closeModal() {
  modalOpen.classList.remove(classModuleOpen);
  buttonClose.removeEventListener('click', closeModal);
  modalOpen.removeEventListener('click', closeModalOverlay)
  document.removeEventListener('keydown', closeModalKey)
}

// Закрытие по нажатию по оверлею

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt);
  }
}

// Закрытие по нажатию на Esc

function closeModalKey(evt) {
  if (evt.key === 'Escape') {
    closeModal(evt);
  }
}
