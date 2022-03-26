import { initialCards } from './jsConstant';
import { openPopUp } from "./modals";
/*  задаем фунцию для добавления фотокарточки*/
export function createPhoto(photoName, photoLink) {
  const photoTemplate = document.querySelector('#element-template').content;
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
      const photoCardImageScaled = document.querySelector('.popup__image-scaled');
      const photoCardNameScaled = document.querySelector('.popup__title');
      const popupPhotoScaled = document.querySelector('.popup_type_photo-scaled');
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
export function renderPhoto(photo) {
  const photoContainer = document.querySelector('.elements');
  photoContainer.prepend(photo);
};

/*  проверяем что контейнер элементс пустой и заполняем его 6 карточками.
цикл обратный чтобы сделать фунцию добавления карточи универсальной через prepend*/
export function createInitialSetOfCards () {
  const element = document.querySelector('.element');
if (element === null) {
  for (let i = initialCards.length - 1; i > -1; i -= 1) {
    const photoName = initialCards[i].name;
    const photoLink = initialCards[i].link;
    renderPhoto(createPhoto(photoName, photoLink));
  }
};
};
