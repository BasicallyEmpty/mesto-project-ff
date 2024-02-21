import '../src/index.css';
import { requestUserInfo, requestCards } from './components/api.js';
import { config, editBtn, addBtn, popups, popupTypeEdit, popupTypeNew, popupTypeImage, popupImage, popupCaption, profileImage, profileName, profileDescription, formEdit, nameInput, descriptionInput, formNew, placeName, placeLink } from './components/constants.js';
import { createCard, addCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup, clickHandler } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

let userId;

editBtn.addEventListener('click', () => {
  clearValidation(formEdit, config);
  openPopup(popupTypeEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
})

addBtn.addEventListener('click', () => {
  clearValidation(formNew, config);
  formNew.reset();
  openPopup(popupTypeNew);
})

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => clickHandler(evt, popup))
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

const setUserInfo = (info) => {
  profileImage.style.backgroundImage = `url(${info.avatar})`;
  profileName.textContent = info.name;
  profileDescription.textContent = info.about;
  userId = info._id;
}

const initializeCards = cards => {
  cards.forEach(el => {
    addCard((createCard(el.name, el.link, deleteCard, likeCard, showImg)))
  })
}


const getUserInfo = new Promise((resolve, reject) => {
  requestUserInfo()
    .then(res => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    })
})

const getCards = new Promise((resolve, reject) => {
  requestCards()
    .then(res => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    })
})

formEdit.addEventListener('submit', formEditSubmitHandler);
formNew.addEventListener('submit', formNewSubmitHandler);

const promises = [getUserInfo, getCards];

Promise.all(promises)
  .then(res => {
    setUserInfo(res[0]);
    initializeCards(res[1]);
  })
  .catch(err => console.log(err))

enableValidation(config);
