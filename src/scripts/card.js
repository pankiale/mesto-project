import { openPopUp } from "./modals";
import { api } from "./index";
import { userId } from "./index";
const photoCardImageScaled = document.querySelector(".popup__image-scaled");
const photoCardNameScaled = document.querySelector(".popup__title");
const popupPhotoScaled = document.querySelector(".popup_type_photo-scaled");
const photoContainer = document.querySelector(".elements");


export default class Card {
  constructor (data, selector) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
  }

  _getElement () {
    const photoCard = document
    .querySelector(this._selector)
    .content
    .querySelector(".element")
    .cloneNode(true);

    return photoCard;
  }

  _findMyLikes() {
    return this._likes.findIndex((like) => like._id === userId);
  }

  generate () {
    /*set local constant*/
    this._element = this._getElement();
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage = this._element.querySelector(".element__image");
    this._elementLikeCounter = this._element.querySelector(".element__like-counter");
    this._elementLikeButton = this._element.querySelector(".element__like-button");
    this._elementDeleteButton = this._element.querySelector(".element__delete-button")

    /*actualise local constants*/
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikeCounter.textContent = this._likes.length;
    if (this._findMyLikes() > -1) {
      this._elementLikeButton.classList.add("element__like-button_active");
    }
    if (this._ownerId !== userId) {
      this._elementDeleteButton.style = "display: none";
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._elementLikeButton.addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });
  }

  _handleOpenPopup() {
    photoCardImageScaled.src = this._link;
    photoCardImageScaled.alt = this._name;
    photoCardNameScaled.textContent = this._name;
    openPopUp(popupPhotoScaled);
  }

  _handleDeleteCard() {
    api.removeCard(this._cardId)
    .then(() => {
      this._elementDeleteButton.closest(".element").remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  }

  _handleLikeButton(evt){
    if (!evt.target.classList.contains("element__like-button_active")) {
      api.addLike(this._cardId)
        .then((dataFromServer) => {
          this._elementLikeCounter.textContent = `${dataFromServer.likes.length}`;
        })
        .then(() =>
          this._elementLikeButton.classList.toggle("element__like-button_active")
        )
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    } else {
      api.removeLike(this._cardId)
        .then((dataFromServer) => {
          this._elementLikeCounter.textContent = `${dataFromServer.likes.length}`;
        })
        .then(() =>
        this._elementLikeButton.classList.toggle("element__like-button_active")
        )
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    }
  }
}

export function renderPhoto(photo) {
  photoContainer.prepend(photo);
}

export function createInitialSetOfCards(data) {
  data.reverse().forEach((cardData) => {
    const cardClass = new Card (cardData, "#element-template" );
    const card = cardClass.generate()

    renderPhoto(card);
  });
}
