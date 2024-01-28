import '../src/index.css';
import { editBtn, addBtn, popups, popupTypeEdit, popupTypeNew, popupTypeImage, popupImage, popupCaption, profileName, profileDescription, formEdit, nameInput, descriptionInput, formNew, placeName, placeLink } from './components/constants.js';
import { initialCards } from './components/cards.js';
import { createCard, addCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';



editBtn.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
})

addBtn.addEventListener('click', () => {
  formNew.reset();
  openPopup(popupTypeNew);
})

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

const formEditSubmitHandler = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeEdit);
}

const formNewSubmitHandler = evt => {
  evt.preventDefault();
  addCard(createCard(placeName.value, placeLink.value, deleteCard, likeCard, showImg));
  closePopup(popupTypeNew);
  formNew.reset();
}

const showImg = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);
}

const initializeCards = arr => {
  arr.forEach(el => {
    addCard((createCard(el.name, el.link, deleteCard, likeCard, showImg)))
  })
}

formEdit.addEventListener('submit', formEditSubmitHandler)
formNew.addEventListener('submit', formNewSubmitHandler)

initializeCards(initialCards)