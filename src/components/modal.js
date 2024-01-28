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

export { openPopup, closePopup }