// в файле modal.js описаны функции для работы с модальными окнами

const classModuleOpen= 'popup_is-opened';
let modalOpen = null;

// @todo: Функция открытия модального окна

export function openModal(modal) {
  modal.classList.add(classModuleOpen);
  modal.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalKey);
  modalOpen = modal;
}

// @todo: Функция закрытия модального окна

export function closeModal() {
  modalOpen.classList.remove(classModuleOpen);
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
    closeModal();
  }
}
