import '../src/index.css';
import { requestUserInfo, requestCards, updateProfile, postCard, updateAvatar, removeCard } from './components/api.js';
import { config, editBtn, addBtn, popups, popupTypeEdit, popupTypeNew, popupTypeImage, popupImage, popupTypeUpdateAvatar, popupTypeConfirmDelete, popupCaption, profileImage, profileName, profileDescription, formEdit, nameInput, descriptionInput, formNew, placeName, placeLink, formUpdateAvatar, avatarLink, confirmDeleteBtn } from './components/constants.js';
import { createCard, addCard, likeHandler } from './components/card.js';
import { openPopup, closePopup, clickHandler } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

let userId;

const cardDeleteHandler = (cardInfo, cardElement) => {
  const defaultMsg = 'Да';
  const workingMsg = 'Удаление...';
  openPopup(popupTypeConfirmDelete);
  confirmDeleteBtn.addEventListener('click', (evt) => {
    renderLoading(true, evt, defaultMsg, workingMsg);
    removeCard(cardInfo._id)
    .then(res => {
      if (res.ok) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    .then(() => cardElement.remove())
    .then(() => closePopup(popupTypeConfirmDelete))
    .catch(err => console.log(`Не удалось удалить карточку: ${err}`))
    .finally(() => renderLoading(false, evt, defaultMsg, workingMsg))
  })
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

function renderLoading(isWorking, evt, defaultMsg, workingMsg) {
  const button = evt.target.closest('.popup__content').querySelector('.button');
  if (isWorking) {
    button.textContent = workingMsg;
  } else {
    button.textContent = defaultMsg;
  }
}

const formEditSubmitHandler = evt => {
  evt.preventDefault();
  const defaultMsg = 'Сохранить';
  const workingMsg = 'Сохранение...';
  renderLoading(true, evt, defaultMsg, workingMsg);
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
    .finally(() => renderLoading(false, evt, defaultMsg, workingMsg));
}

const formNewSubmitHandler = evt => {
  evt.preventDefault();
  const defaultMsg = 'Создать';
  const workingMsg = 'Создание...';
  renderLoading(true, evt, defaultMsg, workingMsg);
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
    .then(card => addCard(createCard(card, cardDeleteHandler, likeHandler, showImg, userId)))
    .then(() => closePopup(popupTypeNew))
    .then(() => formNew.reset())
    .catch(err => console.log(`Не удалось создать карточку: ${err}`))
    .finally(() => renderLoading(false, evt, defaultMsg, workingMsg));
}

const formUpdateAvatarSubmitHandler = evt => {
  evt.preventDefault();
  const defaultMsg = 'Сохранить';
  const workingMsg = 'Сохранение...';
  renderLoading(true, evt, defaultMsg, workingMsg);
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
    .finally(() => renderLoading(false, evt, defaultMsg, workingMsg));
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
    addCard((createCard(card, cardDeleteHandler, likeHandler, showImg, userId)))
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
