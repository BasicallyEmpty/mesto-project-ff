const placesList = document.querySelector('.places__list');

const addCard = card => {
  placesList.prepend(card);
}

const likeCard = evt => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_is-active');
}

const deleteCard = el => {
  el.remove();
}

const createCard = (cardInfo, deleteCallback, likeCallback, showImgCallback) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const deleteBtn = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardInfo.name;
  cardImg.src = cardInfo.link;
  cardImg.alt = cardInfo.name;

  cardImg.addEventListener('click', () => showImgCallback(cardTitle.textContent, cardImg.src));
  likeBtn.addEventListener('click', likeCallback);
  deleteBtn.addEventListener('click', () => deleteCallback(cardElement));

  return cardElement;
}

export { createCard, addCard, deleteCard, likeCard }