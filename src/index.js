import '../src/index.css';
import { initialCards } from './components/cards.js';
import { createCard, addCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNew = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
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
})

addBtn.addEventListener('click', () => {
  formNew.reset();
  openPopup(popupTypeNew);
})

closePopupBtns.forEach((item) => {
  item.addEventListener('click', evt => {
    closePopup(evt.target.closest('.popup'))
  })
})

const formEditSubmitHandler = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeEdit);
}

const showImg = evt => {
  const card = evt.target.closest('.card');
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  popupImage.src = cardImg.src;
  popupImage.alt = cardTitle.textContent;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupTypeImage);
}

const formNewSubmitHandler = evt => {
  evt.preventDefault();
  addCard(createCard(placeName.value, placeLink.value, deleteCard, likeCard, showImg));
  closePopup(popupTypeNew);
  formNew.reset();
}

const initializeCards = arr => {
  arr.forEach(el => {
    addCard((createCard(el.name, el.link, deleteCard, likeCard, showImg)))
  })
}

formEdit.addEventListener('submit', formEditSubmitHandler)
formNew.addEventListener('submit', formNewSubmitHandler)

initializeCards(initialCards)