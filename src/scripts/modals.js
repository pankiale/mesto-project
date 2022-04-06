function handleEscKey(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    const popup = document.querySelector(".popup_open");
    closePopUp(popup);
  }
}

export function openPopUp(popupName) {
  popupName.classList.add("popup_open");
  document.addEventListener("keydown", handleEscKey);
}

export function closePopUp(popupName) {
  popupName.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscKey);
}

export function setPopupEventListeners() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_open")) {
        closePopUp(popup);
      }
      if (evt.target.classList.contains("popup__close-button")) {
        closePopUp(popup);
      }
    });
  });
}
