import '../src/index.css';
import {initialCards} from './components/cards.js';
import {createCard, initializeCards} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNew = document.querySelector('.popup_type_new-card');  

editBtn.addEventListener('click', () => {
  openPopup(popupTypeEdit);
});

addBtn.addEventListener('click', () => {
  openPopup(popupTypeNew);
})

closePopupBtns.forEach((item) => {
  item.addEventListener('click', evt => {
    closePopup(evt.target.closest('.popup'));
  });
});

initializeCards(initialCards);