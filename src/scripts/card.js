import { openPopUp } from "./modals";
import { api } from "./index";
import { userId } from "./index";
const photoCardImageScaled = document.querySelector(".popup__image-scaled");
const photoCardNameScaled = document.querySelector(".popup__title");
const popupPhotoScaled = document.querySelector(".popup_type_photo-scaled");
const photoContainer = document.querySelector(".elements");

function findMyLikes(cardData) {
  return cardData.likes.findIndex((like) => like._id === userId);
}

export function createPhoto(cardData) {
  /*  эти константы внутри фукции поскольку я создаю уникальную карточку из темплейта а затем ищу в ней элементы*/
  const photoCard = document.querySelector("#element-template").content.querySelector(".element").cloneNode(true);
  const photoCardImage = photoCard.querySelector(".element__image");
  const photoCardTitle = photoCard.querySelector(".element__title");
  const photoCardLikeButton = photoCard.querySelector(".element__like-button");
  const photoCardDeleteButton = photoCard.querySelector(".element__delete-button");
  const photoCardLikeCounter = photoCard.querySelector(".element__like-counter");

  photoCardTitle.textContent = cardData.name;
  photoCardImage.src = cardData.link;
  photoCardImage.alt = cardData.name;
  photoCardLikeCounter.textContent = `${cardData.likes.length}`;
  if (findMyLikes(cardData) > -1) {
    photoCardLikeButton.classList.add("element__like-button_active");
  }
  if (cardData.owner._id !== userId) {
    photoCardDeleteButton.style = "display: none";
  }

  photoCardLikeButton.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("element__like-button_active")) {
      api.addLike(cardData._id)
        .then((dataFromServer) => {
          photoCardLikeCounter.textContent = `${dataFromServer.likes.length}`;
        })
        .then(() =>
          photoCardLikeButton.classList.toggle("element__like-button_active")
        )
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    } else {
      api.removeLike(cardData._id)
        .then((dataFromServer) => {
          photoCardLikeCounter.textContent = `${dataFromServer.likes.length}`;
        })
        .then(() =>
          photoCardLikeButton.classList.toggle("element__like-button_active")
        )
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    }
  });

  photoCardImage.addEventListener("click", () => {
    photoCardImageScaled.src = cardData.link;
    photoCardImageScaled.alt = cardData.name;
    photoCardNameScaled.textContent = cardData.name;
    openPopUp(popupPhotoScaled);
  });

  photoCardDeleteButton.addEventListener("click", () => {
    api.removeCard(cardData._id)
      .then(() => {
        photoCardDeleteButton.closest(".element").remove();
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  });

  return photoCard;
}

export function renderPhoto(photo) {
  photoContainer.prepend(photo);
}

export function createInitialSetOfCards(data) {
  data.reverse().forEach((cardData) => renderPhoto(createPhoto(cardData)));
}
