import { openPopUp } from "./modals";
import { closePopUp } from "./modals";
import { validationConfig } from "./jsConstant";
import { toggleButtonState } from "./validation";
import { editProfileData, editAvatarPicture } from "./api";
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_avatar');
const buttonSubmitProfile = document.querySelector('.form_prof');
const nameInput = document.querySelector('.form__item_prof_title');
const jobInput = document.querySelector('.form__item_prof_subtitle');
const submitButton = popupProfile.querySelector('.form__save-button');
const profileAvatar = document.querySelector('.profile__avatar');
const popupProfileAvatar = document.querySelector('.popup_type_avatar_photo');
const formProfileAvatar = popupProfileAvatar.querySelector('.form');
const avatarInput = document.querySelector('.form__item_avatar_photo_link');

export function createProfileFromServer (data) {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  profileAvatar.src = data.avatar;
}

function submitProfileForm(evt) {
  evt.preventDefault();
  editProfileData({name: nameInput.value, about: jobInput.value})
  .then((dataFromServer)=>{
    profileName.textContent = dataFromServer.name;
    profileJob.textContent = dataFromServer.about;
  })
  closePopUp(popupProfile);
};

function submitProfileAvatar(evt) {
  evt.preventDefault();
  editAvatarPicture({avatar: avatarInput.value})
  .then((dataFromServer)=>{
    profileAvatar.src = dataFromServer.avatar;
  })
  closePopUp(popupProfileAvatar);
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
formProfileAvatar.addEventListener('submit', (evt) => {
  submitProfileAvatar(evt);
  });
profileAvatar.addEventListener('click',()=>{
  openPopUp(popupProfileAvatar);
  formProfileAvatar.reset();
  const errorMessages = popupProfileAvatar.querySelectorAll('.form__error');
  errorMessages.forEach(error => error.textContent = '');
  const errorInputs = popupProfileAvatar.querySelectorAll('.form__item_error');
  errorInputs.forEach(error => error.classList.remove('form__item_error'));
  toggleButtonState(submitButton, false, validationConfig);
})
};
