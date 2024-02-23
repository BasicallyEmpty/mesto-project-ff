const keyHandler = evt => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup)
  }
}

const clickHandler = (evt, popup) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(popup);
  }
}

const openPopup = el => {
  el.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
}

const closePopup = el => {
  el.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandler);
}

export { openPopup, closePopup, clickHandler }