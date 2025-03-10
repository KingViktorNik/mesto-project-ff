import '../pages/index.css';
import { createCard, deleteCard, likeToggle } from './card.js';
import { initialCards } from './cards.js';
import { openModal } from './modal.js'; 

const pageСontent = document.querySelector('.page__content');
const placesList = document.querySelector('.places__list');


initialCards.forEach(card => placesList.append(createCard(card, openModal, deleteCard, likeToggle)));
pageСontent.addEventListener('click', openModal);
