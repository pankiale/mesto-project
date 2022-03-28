import { openPopUp } from "./modals";
import { closePopUp } from "./modals";
import { createPhoto } from './card';
import { renderPhoto } from './card';
import { validationConfig } from "./jsConstant";
import { toggleButtonState } from "./validation";
const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonClosePhoto = document.querySelector('.popup__close-button_photo-card');
const buttonClosePhotoScaled = document.querySelector('.popup__close-button_photo-scaled');
const buttonSubmitPhoto = document.querySelector('.form_photo');
const popupPhoto = document.querySelector('.popup_type_photo-card');
const formReset = popupPhoto.querySelector('.form');
const popupPhotoScaled = document.querySelector('.popup_type_photo-scaled');
const photoName = document.querySelector('.form__item_photo_title');
const photoLink = document.querySelector('.form__item_photo_link');
const submitButton = popupPhoto.querySelector('.form__save-button');

function submitPhotoForm(evt) {
  evt.preventDefault();
  renderPhoto(createPhoto(photoName.value, photoLink.value));
  closePopUp(popupPhoto);
};

export function setEventListenersPhoto () {
buttonAddPhoto.addEventListener('click', () => {
  openPopUp(popupPhoto);
  formReset.reset();
  const errorMessages = popupPhoto.querySelectorAll('.form__error');
  errorMessages.forEach(error => error.textContent = '');
  const errorInputs = popupPhoto.querySelectorAll('.form__item_error');
  errorInputs.forEach(error => error.classList.remove('form__item_error'));
  toggleButtonState(submitButton, false, validationConfig);
});
buttonClosePhoto.addEventListener('click', closePopUp.bind(null, popupPhoto));
buttonSubmitPhoto.addEventListener('submit', submitPhotoForm);
buttonClosePhotoScaled.addEventListener('click', () => {
  closePopUp(popupPhotoScaled);
});
};
