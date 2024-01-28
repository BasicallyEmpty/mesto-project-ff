const placesList = document.querySelector('.places__list');

const addCard = card => {
  placesList.prepend(card);
}

const likeCard = evt => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_is-active');
}

const deleteCard = evt => {
  evt.target.closest('.card').remove();
}

const createCard = (name, link, deleteCallback, likeCallback, showImgCallback) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const deleteBtn = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;

  cardImg.addEventListener('click', showImgCallback);
  likeBtn.addEventListener('click', likeCallback);
  deleteBtn.addEventListener('click', deleteCallback);

  return cardElement;
}

export { createCard, addCard, deleteCard, likeCard }