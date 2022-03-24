import './../pages/index.css';

import { initialCards } from './jsConstant';
import { validationConfig } from './jsConstant';
import { enableValidation } from './validation';

const content = document.querySelector('.content');
const element = content.querySelector('.element');
const photoContainer = document.querySelector('.elements');
const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePhoto = document.querySelector('.popup__close-button_photo-card');
const buttonClosePhotoScaled = document.querySelector('.popup__close-button_photo-scaled');
const buttonCloseProfile = document.querySelector('.popup__close-button_avatar');
const buttonSubmitProfile = document.querySelector('.form_prof');
const buttonSubmitPhoto = document.querySelector('.form_photo');
const popupProfile = document.querySelector('.popup_type_avatar');
const popupPhoto = document.querySelector('.popup_type_photo-card');
const popupPhotoScaled = document.querySelector('.popup_type_photo-scaled');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.form__item_prof_title');
const jobInput = document.querySelector('.form__item_prof_subtitle');
const photoName = document.querySelector('.form__item_photo_title');
const photoLink = document.querySelector('.form__item_photo_link');
const photoTemplate = document.querySelector('#element-template').content;
const photoCardImageScaled = document.querySelector('.popup__image-scaled');
const photoCardNameScaled = document.querySelector('.popup__title');


/*  задаем фунцию для добавления фотокарточки*/
function createPhoto(photoName, photoLink) {
  const photoCard = photoTemplate.querySelector('.element').cloneNode(true);
  photoCard.querySelector('.element__title').textContent = photoName;
  photoCard.querySelector('.element__image').src = photoLink;
  photoCard.querySelector('.element__image').alt = photoName;

  const photoCardLikeButton = photoCard.querySelector('.element__like-button');
    photoCardLikeButton.addEventListener('click', () => {
    photoCardLikeButton.classList.toggle('element__like-button_active');
    });

  const photoCardImage = photoCard.querySelector('.element__image');
    photoCardImage.addEventListener('click', () => {
      photoCardImageScaled.src = photoLink;
      photoCardImageScaled.alt = photoName;
      photoCardNameScaled.textContent = photoName;
    openPopUp(popupPhotoScaled);
    });

  const photoCardDeleteButton = photoCard.querySelector('.element__delete-button');
    photoCardDeleteButton.addEventListener('click', () => {
      photoCardDeleteButton.closest('.element').remove();
    });

  return photoCard;
};

/*  задаем фунцию для отрисовки фотокарточки*/
function renderPhoto(photo) {
  photoContainer.prepend(photo);
};

/*  задаем фунцию открытия попап только для попап профиля забираем данные для формы из дом*/
function openPopUp(popupName) {
  popupName.classList.add('popup_open');
};

/*  задаем фунцию закрытия попап только для попап профиля обнуляем данные в форме*/
function closePopUp(popupName) {
  popupName.classList.remove('popup_open');
};

/*  задаем фунцию сабмита данных*/
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(popupProfile);
};

/*обрабатывает фото карточку - забирает имя и ссылку из формы, передает их функции addphoto
(добавление фотокарточки на страницу) и обнуляет поля имя и ссылка в форме затем вызывает closePopUp*/
function submitPhotoForm(evt) {
  evt.preventDefault();
  renderPhoto(createPhoto(photoName.value, photoLink.value));
  photoName.value = '';
  photoLink.value = '';
  closePopUp(popupPhoto);
};

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopUp(popupProfile);
});
buttonCloseProfile.addEventListener('click', () => {
  closePopUp(popupProfile);
  nameInput.value = '';
  jobInput.value = '';
});
buttonSubmitProfile.addEventListener('submit', (evt) => {
  submitProfileForm(evt);
  nameInput.value = '';
  jobInput.value = '';
  });

buttonAddPhoto.addEventListener('click', openPopUp.bind(null, popupPhoto));
buttonClosePhoto.addEventListener('click', closePopUp.bind(null, popupPhoto));
buttonSubmitPhoto.addEventListener('submit', submitPhotoForm);

buttonClosePhotoScaled.addEventListener('click', closePopUp.bind(null, popupPhotoScaled));

/*  проверяем что контейнер элементс пустой и заполняем его 6 карточками.
цикл обратный чтобы сделать фунцию добавления карточи универсальной через prepend*/
if (element === null) {
  for (let i = initialCards.length - 1; i > -1; i -= 1) {
    const photoName = initialCards[i].name;
    const photoLink = initialCards[i].link;
    renderPhoto(createPhoto(photoName, photoLink));
  }
};

enableValidation(validationConfig);
