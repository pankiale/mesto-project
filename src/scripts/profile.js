import { openPopUp } from "./modals";
import { closePopUp } from "./modals";
import { validationConfig } from "./jsConstant";
import { toggleButtonState } from "./validation";
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_avatar');
const buttonSubmitProfile = document.querySelector('.form_prof');
const nameInput = document.querySelector('.form__item_prof_title');
const jobInput = document.querySelector('.form__item_prof_subtitle');
const submitButton = popupProfile.querySelector('.form__save-button');

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(popupProfile);
};

export function setEventListenersProfile () {
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopUp(popupProfile);
  const errorMessages = popupProfile.querySelectorAll('.form__error');
  errorMessages.forEach(error => error.textContent = '');
  const errorInputs = popupProfile.querySelectorAll('.form__item_error');
  errorInputs.forEach(error => error.classList.remove('form__item_error'));
  toggleButtonState(submitButton, false, validationConfig);
});
buttonSubmitProfile.addEventListener('submit', (evt) => {
  submitProfileForm(evt);
  });
};
