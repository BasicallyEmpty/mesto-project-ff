export const editBtn = document.querySelector('.profile__edit-button');
export const addBtn = document.querySelector('.profile__add-button');
export const popups = document.querySelectorAll('.popup');
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNew = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupTypeUpdateAvatar = document.querySelector('.popup_type_update-avatar');
export const popupTypeConfirmDelete = document.querySelector('.popup_type_confirm-delete');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
export const profileImage = document.querySelector('.profile__image');
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const formEdit = document.forms['edit-profile'];
export const nameInput = formEdit.elements.name;
export const descriptionInput = formEdit.elements.description;
export const formNew = document.forms['new-place'];
export const placeName = formNew.elements['place-name'];
export const placeLink = formNew.elements.link;
export const formUpdateAvatar = document.forms['update-avatar'];
export const avatarLink = formUpdateAvatar.elements.link;
export const formConfirmDelete = document.forms['confirm-delete'];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}