import { initialCards } from './jsConstant';
import { openPopUp } from "./modals";
const photoCardImageScaled = document.querySelector('.popup__image-scaled');
const photoCardNameScaled = document.querySelector('.popup__title');
const popupPhotoScaled = document.querySelector('.popup_type_photo-scaled');
const photoContainer = document.querySelector('.elements');

export function createPhoto(photoName, photoLink) {
  /*  эти константы внутри фукции поскольку я создаю уникальную карточку из темплейта а затем ищу в ней элементы*/
  const photoTemplate = document.querySelector('#element-template').content;
  const photoCard = photoTemplate.querySelector('.element').cloneNode(true);
  const photoCardImage = photoCard.querySelector('.element__image');
  const photoCardTitle = photoCard.querySelector('.element__title');
  const photoCardLikeButton = photoCard.querySelector('.element__like-button');
  const photoCardDeleteButton = photoCard.querySelector('.element__delete-button');

  photoCardTitle.textContent = photoName;
  photoCardImage.src = photoLink;
  photoCardImage.alt = photoName;

  photoCardLikeButton.addEventListener('click', () => {
  photoCardLikeButton.classList.toggle('element__like-button_active');
  });

  photoCardImage.addEventListener('click', () => {
    photoCardImageScaled.src = photoLink;
    photoCardImageScaled.alt = photoName;
    photoCardNameScaled.textContent = photoName;
    openPopUp(popupPhotoScaled);
    });

  photoCardDeleteButton.addEventListener('click', () => {
    photoCardDeleteButton.closest('.element').remove();
  });

  return photoCard;
};

export function renderPhoto(photo) {
  photoContainer.prepend(photo);
};

export function createInitialSetOfCards (data) {
  data.forEach(card => renderPhoto(createPhoto(card.name, card.link)));
};
