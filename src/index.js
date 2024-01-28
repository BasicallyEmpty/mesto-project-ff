import '../src/index.css';
import {initialCards} from './components/cards.js';
import {createCard, addCard, deleteCard, initializeCards} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNew = document.querySelector('.popup_type_new-card');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const descriptionInput = formEdit.elements.description;
const formNew = document.forms['new-place'];
const placeName = formNew.elements['place-name'];
const placeLink = formNew.elements.link;


editBtn.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

addBtn.addEventListener('click', () => {
  formNew.reset();
  openPopup(popupTypeNew);
})

closePopupBtns.forEach((item) => {
  item.addEventListener('click', evt => {
    closePopup(evt.target.closest('.popup'));
  });
});

const formEditSubmitHandler = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeEdit);
}

const formNewSubmitHandler = evt => {
  evt.preventDefault();
  addCard(createCard(placeName.value, placeLink.value, deleteCard));
  closePopup(popupTypeNew);
  formNew.reset();
}

formEdit.addEventListener('submit', formEditSubmitHandler);
formNew.addEventListener('submit', formNewSubmitHandler);

initializeCards(initialCards);