const removeListeners = () => {
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('mousedown', clickHandler);
}

const keyHandler = evt => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup)
    removeListeners();
  }
}

const clickHandler = evt => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (!evt.target.closest('.popup__content')) {
    closePopup(activePopup)
    removeListeners();
  }
}

const openPopup = el => {
  el.classList.add('popup_is-opened');
}

const closePopup = el => {
  el.classList.remove('popup_is-opened');
}

export { openPopup, closePopup, keyHandler, clickHandler }