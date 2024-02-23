import '../src/index.css';
import { requestUserInfo, requestCards, updateProfile, postCard, updateAvatar, removeCard } from './components/api.js';
import { config, editBtn, addBtn, popups, popupTypeEdit, popupTypeNew, popupTypeImage, popupImage, popupTypeUpdateAvatar, popupTypeConfirmDelete, popupCaption, profileImage, profileName, profileDescription, formEdit, nameInput, descriptionInput, formNew, placeName, placeLink, formUpdateAvatar, avatarLink, formConfirmDelete } from './components/constants.js';
import { createCard, addCard, likeHandler } from './components/card.js';
import { openPopup, closePopup, clickHandler } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { handleSubmit } from './components/utils.js';

let userId;
let cardToRemove = { id: '', el: '' };

const cardDeleteCallback = (cardInfo, cardElement) => {
  cardToRemove.id = cardInfo._id;
  cardToRemove.el = cardElement.closest('.card');
  openPopup(popupTypeConfirmDelete);
}

const cardDeleteHandler = evt => {
  const makeRequest = () => {
    return removeCard(cardToRemove.id)
      .then(() => {
        cardToRemove.el.remove();
        closePopup(popupTypeConfirmDelete);
        cardToRemove.id = '';
        cardToRemove.el = '';
      })
  }
  handleSubmit(makeRequest, evt, 'Удаление...')
}

editBtn.addEventListener('click', () => {
  clearValidation(formEdit, config);
  openPopup(popupTypeEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
})

addBtn.addEventListener('click', () => {
  clearValidation(formNew, config);
  openPopup(popupTypeNew);
})

profileImage.addEventListener('click', () => {
  clearValidation(formUpdateAvatar, config);
  openPopup(popupTypeUpdateAvatar);
})

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => clickHandler(evt, popup))
})

const formEditSubmitHandler = evt => {
  const name = nameInput.value;
  const description = descriptionInput.value;
  const makeRequest = () => {
    return updateProfile(name, description)
      .then(res => setUserInfo(res))
      .then(() => closePopup(popupTypeEdit))
  }
  handleSubmit(makeRequest, evt);
}

const formNewSubmitHandler = evt => {
  const name = placeName.value;
  const link = placeLink.value;
  const makeRequest = () => {
    return postCard(name, link)
      .then(card => addCard(createCard(card, cardDeleteCallback, likeHandler, showImg, userId)))
      .then(() => closePopup(popupTypeNew))
  }
  handleSubmit(makeRequest, evt, 'Создание...')
}

const formUpdateAvatarSubmitHandler = evt => {
  const link = avatarLink.value;
  const makeRequest = () => {
    return updateAvatar(link)
      .then(res => setUserInfo(res))
      .then(() => closePopup(popupTypeUpdateAvatar))
  }
  handleSubmit(makeRequest, evt)
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
  cards.forEach(card => {
    addCard((createCard(card, cardDeleteCallback, likeHandler, showImg, userId)))
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
formUpdateAvatar.addEventListener('submit', formUpdateAvatarSubmitHandler);
formConfirmDelete.addEventListener('submit', cardDeleteHandler);

Promise.all([getUserInfo, getCards])
  .then(([userData, cards]) => {
    setUserInfo(userData);
    initializeCards(cards);
  })
  .catch(console.error)

enableValidation(config);
