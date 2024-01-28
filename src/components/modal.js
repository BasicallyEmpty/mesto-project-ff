const keyHandler = evt => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup)
  }
}

const clickHandler = evt => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (!evt.target.closest('.popup__content')) {
    closePopup(activePopup)
  }
}

const openPopup = el => {
  el.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('mousedown', clickHandler);
}

const closePopup = el => {
  el.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('mousedown', clickHandler);
}

const showImg = evt => {
  const card = evt.target.closest('.card');
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = cardImg.src;
  popupImage.alt = cardTitle.textContent;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupTypeImage);
}

export { openPopup, closePopup, showImg }