const keyHandler = evt => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup)
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

export { openPopup, closePopup }