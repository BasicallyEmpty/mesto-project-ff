import '../src/index.css';
import { requestUserInfo, requestCards, updateProfile, postCard, updateAvatar } from './components/api.js';
import { config, editBtn, addBtn, popups, popupTypeEdit, popupTypeNew, popupTypeImage, popupImage, popupTypeUpdateAvatar, popupCaption, profileImage, profileName, profileDescription, formEdit, nameInput, descriptionInput, formNew, placeName, placeLink, formUpdateAvatar, avatarLink } from './components/constants.js';
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
  openPopup(popupTypeNew);
})

profileImage.addEventListener('click', () => {
  clearValidation(formUpdateAvatar, config);
  openPopup(popupTypeUpdateAvatar);
})

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => clickHandler(evt, popup))
})

function renderLoading(isLoading, evt) {
  const button = evt.target.closest('form').querySelector('button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

const formEditSubmitHandler = evt => {
  evt.preventDefault();
  renderLoading(true, evt);
  const name = nameInput.value;
  const description = descriptionInput.value;
  updateProfile(name, description)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    })
    .then(res => setUserInfo(res))
    .then(() => closePopup(popupTypeEdit))
    .catch(err => console.log(`Не удалось обновить данные профиля: ${err}`))
    .finally(() => renderLoading(false, evt));
}

const formNewSubmitHandler = evt => {
  evt.preventDefault();
  renderLoading(true, evt);
  const name = placeName.value;
  const link = placeLink.value;
  postCard(name, link)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    })
    .then(card => addCard(createCard(card, deleteCard, likeCard, showImg)))
    .then(() => closePopup(popupTypeNew))
    .then(() => formNew.reset())
    .catch(err => console.log(`Не удалось создать карточку: ${err}`))
    .finally(() => renderLoading(false, evt));
}

const formUpdateAvatarSubmitHandler = evt => {
  evt.preventDefault();
  renderLoading(true, evt);
  const link = avatarLink.value;
  updateAvatar(link)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    })
    .then(res => setUserInfo(res))
    .then(() => closePopup(popupTypeUpdateAvatar))
    .then(() => formUpdateAvatar.reset())
    .catch(err => console.log(`Не удалось обновить аватар: ${err}`))
    .finally(() => renderLoading(false, evt));
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
    addCard((createCard(card, deleteCard, likeCard, showImg)))
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

const promises = [getUserInfo, getCards];

Promise.all(promises)
  .then(res => {
    setUserInfo(res[0]);
    initializeCards(res[1]);
  })
  .catch(err => console.log(err))

enableValidation(config);
