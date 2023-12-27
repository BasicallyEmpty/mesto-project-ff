const placesList = document.querySelector('.places__list');

const addCard = (card) => {
  placesList.append(card);
}

const deleteCard = btn => {
  btn.target.closest('.card').remove();
}

const createCard = (card, delCallback) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteBtn = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.name;

  deleteBtn.addEventListener('click', delCallback);

  return cardElement;
}

const initializeCards = arr => {
  arr.forEach(el => {
    addCard((createCard(el, deleteCard)))
  });
}

initializeCards(initialCards);