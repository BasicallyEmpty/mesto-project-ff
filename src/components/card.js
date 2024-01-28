const placesList = document.querySelector('.places__list');

const addCard = card => {
  placesList.prepend(card);
}

const likeCard = evt => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_is-active');
}

const deleteCard = btn => {
  btn.target.closest('.card').remove();
}

const createCard = (name, link) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const deleteBtn = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;

  likeBtn.addEventListener('click', likeCard);
  deleteBtn.addEventListener('click', deleteCard);

  return cardElement;
}

const initializeCards = arr => {
  arr.forEach(el => {
    addCard((createCard(el.name, el.link, deleteCard)))
  })
}

export { createCard, addCard, deleteCard, initializeCards }