import { initialCards } from './jsConstant';
import { openPopUp } from "./modals";
import { addLike, removeCard, removeLike } from './api';
const photoCardImageScaled = document.querySelector('.popup__image-scaled');
const photoCardNameScaled = document.querySelector('.popup__title');
const popupPhotoScaled = document.querySelector('.popup_type_photo-scaled');
const photoContainer = document.querySelector('.elements');

function findMyLikes(cardData) {
  return cardData.likes.findIndex(like => like._id === "f9cfe877d794e9d43bcff722");
}

export function createPhoto(cardData) {
  /*  эти константы внутри фукции поскольку я создаю уникальную карточку из темплейта а затем ищу в ней элементы*/
  const photoTemplate = document.querySelector('#element-template').content;
  const photoCard = photoTemplate.querySelector('.element').cloneNode(true);
  const photoCardImage = photoCard.querySelector('.element__image');
  const photoCardTitle = photoCard.querySelector('.element__title');
  const photoCardLikeButton = photoCard.querySelector('.element__like-button');
  const photoCardDeleteButton = photoCard.querySelector('.element__delete-button');
  const photoCardLikeCounter = photoCard.querySelector('.element__like-counter');

  photoCardTitle.textContent = cardData.name;
  photoCardImage.src = cardData.link;
  photoCardImage.alt = cardData.name;
  photoCardLikeCounter.textContent = `${cardData.likes.length}`;
  if (findMyLikes(cardData)> -1) {
    photoCardLikeButton.classList.add('element__like-button_active');
  };
  if (cardData.owner._id !== "f9cfe877d794e9d43bcff722") {
    photoCardDeleteButton.style = 'display: none'
  };

  photoCardLikeButton.addEventListener('click', (evt) => {
  photoCardLikeButton.classList.toggle('element__like-button_active');
  if (evt.target.classList.contains('element__like-button_active')) {
    addLike(cardData._id)
    .then((dataFromServer) => {
      photoCardLikeCounter.textContent = `${dataFromServer.likes.length}`;
    });
  } else {
    removeLike(cardData._id)
    .then((dataFromServer) => {
      photoCardLikeCounter.textContent = `${dataFromServer.likes.length}`;
    });
  }
  });

  photoCardImage.addEventListener('click', () => {
    photoCardImageScaled.src = cardData.link;
    photoCardImageScaled.alt = cardData.name;
    photoCardNameScaled.textContent = cardData.name;
    openPopUp(popupPhotoScaled);
    });

  photoCardDeleteButton.addEventListener('click', () => {
    removeCard(cardData._id)
  .then(() => {
    photoCardDeleteButton.closest('.element').remove();
  });
  });

  return photoCard;
};

export function renderPhoto(photo) {
  photoContainer.prepend(photo);
};

export function createInitialSetOfCards (data) {
  data.forEach(cardData => renderPhoto(createPhoto(cardData)));
};
