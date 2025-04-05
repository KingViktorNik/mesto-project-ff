// в файле modal.js описаны функции для работы с модальными окнами

const classModuleOpen= 'popup_is-opened';

// @todo: Функция открытия модального окна

export function openModal(modal) {
  modal.classList.add(classModuleOpen);
  modal.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalKey);
}

// @todo: Функция закрытия модального окна

export function closeModal(modal) {
  modal.classList.remove(classModuleOpen);
  modal.removeEventListener('click', closeModalOverlay)
  document.removeEventListener('keydown', closeModalKey)
}

// Закрытие по нажатию по оверлею

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

// Закрытие по нажатию на Esc

function closeModalKey(evt) {
  if (evt.key === 'Escape') {
    closeModal(evt.currentTarget.querySelector(`.${classModuleOpen}`));
  }
}
