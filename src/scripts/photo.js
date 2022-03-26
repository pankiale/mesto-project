import { openPopUp } from "./modals";
import { closePopUp } from "./modals";
import { createPhoto } from './card';
import { renderPhoto } from './card';
const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonClosePhoto = document.querySelector('.popup__close-button_photo-card');
const buttonClosePhotoScaled = document.querySelector('.popup__close-button_photo-scaled');
const buttonSubmitPhoto = document.querySelector('.form_photo');
const popupPhoto = document.querySelector('.popup_type_photo-card');
const popupPhotoScaled = document.querySelector('.popup_type_photo-scaled');
const photoName = document.querySelector('.form__item_photo_title');
const photoLink = document.querySelector('.form__item_photo_link');


function submitPhotoForm(evt) {
  evt.preventDefault();
  renderPhoto(createPhoto(photoName.value, photoLink.value));
  photoName.value = '';
  photoLink.value = '';
  closePopUp(popupPhoto);
};

export function setEventListenersPhoto () {
buttonAddPhoto.addEventListener('click', () => {
  openPopUp(popupPhoto);
  photoName.value = '';
  photoLink.value = '';
  const errorMessages = popupPhoto.querySelectorAll('.form__error');
  errorMessages.forEach(error => error.textContent = '');
  const errorInputs = popupPhoto.querySelectorAll('.form__item_error');
  errorInputs.forEach(error => error.classList.remove('form__item_error'));
});
buttonClosePhoto.addEventListener('click', closePopUp.bind(null, popupPhoto));
buttonSubmitPhoto.addEventListener('submit', submitPhotoForm);
buttonClosePhotoScaled.addEventListener('click', () => {
  closePopUp(popupPhotoScaled);
});
};
