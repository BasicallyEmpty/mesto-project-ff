import { postLike, removeLike } from "./api";

const placesList = document.querySelector('.places__list');

const hasOwnLike = (cardInfo, userId) => {
  const likesArr = cardInfo.likes;
  return likesArr.some(element => element._id == userId);
}

const likeCard = (evt, cardInfo) => {
  const likeCounter = evt.target.closest('.card__like-container').querySelector('.card__like-counter')
  postLike(cardInfo._id)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    })
    .then((res) => cardInfo.likes = res.likes)
    .then((res) => likeCounter.textContent = res.length)
    .then(() => evt.target.classList.add('card__like-button_is-active'))
    .catch(err => console.log(`Не удалось поставить лайк: ${err}`))
}

const unlikeCard = (evt, cardInfo) => {
  const likeCounter = evt.target.closest('.card__like-container').querySelector('.card__like-counter')
  removeLike(cardInfo._id)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    })
    .then((res) => cardInfo.likes = res.likes)
    .then((res) => likeCounter.textContent = res.length)
    .then(() => evt.target.classList.remove('card__like-button_is-active'))
    .catch(err => console.log(`Не удалось убрать лайк: ${err}`))
}

const likeHandler = (evt, cardInfo, userId) => {
  if (hasOwnLike(cardInfo, userId)) {
    unlikeCard(evt, cardInfo)
  } else {
    likeCard(evt, cardInfo)
  }
}

const addCard = card => {
  placesList.prepend(card);
}

const deleteCard = el => {
  el.remove();
}

const createCard = (cardInfo, deleteCallback, likeCallback, showImgCallback, userId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const deleteBtn = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardInfo.name;
  cardImg.src = cardInfo.link;
  cardImg.alt = cardInfo.name;
  likeCounter.textContent = cardInfo.likes.length;

  cardImg.addEventListener('click', () => showImgCallback(cardTitle.textContent, cardImg.src));
  likeBtn.addEventListener('click', (evt) => likeCallback(evt, cardInfo, userId));
  deleteBtn.addEventListener('click', () => deleteCallback(cardElement));

  if (hasOwnLike(cardInfo, userId)) {
    likeBtn.classList.add('card__like-button_is-active')
  }

  return cardElement;
}

export { createCard, addCard, deleteCard, likeHandler, hasOwnLike }