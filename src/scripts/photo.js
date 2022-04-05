import { openPopUp } from "./modals";
import { closePopUp } from "./modals";
import { createPhoto } from './card';
import { renderPhoto } from './card';
import { validationConfig } from "./jsConstant";
import { toggleButtonState } from "./validation";
import { addCard } from "./api";
const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonSubmitPhoto = document.querySelector('.form_photo');
const popupPhoto = document.querySelector('.popup_type_photo-card');
const formReset = popupPhoto.querySelector('.form');
const photoName = document.querySelector('.form__item_photo_title');
const photoLink = document.querySelector('.form__item_photo_link');
const submitButton = popupPhoto.querySelector('.form__save-button');

function submitPhotoForm(evt) {
  evt.preventDefault();
  submitButton.textContent = 'Сохранение...';
  addCard({name: photoName.value, link: photoLink.value})
  .then((data) => {
    renderPhoto(createPhoto(data));
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    closePopUp(popupPhoto);
  });
};

export function setEventListenersPhoto () {
buttonAddPhoto.addEventListener('click', () => {
  submitButton.textContent = 'Сохранить';
  openPopUp(popupPhoto);
  formReset.reset();
  const errorMessages = popupPhoto.querySelectorAll('.form__error');
  errorMessages.forEach(error => error.textContent = '');
  const errorInputs = popupPhoto.querySelectorAll('.form__item_error');
  errorInputs.forEach(error => error.classList.remove('form__item_error'));
  toggleButtonState(submitButton, false, validationConfig);
});
buttonSubmitPhoto.addEventListener('submit', submitPhotoForm);
};
