export default class Popup {
  static selectors = {
    profileAvatar: ".popup_type_avatar_photo",
    profileInfo: ".popup_type_avatar",
    newCard: ".popup_type_photo-card",
    photoScaled: ".popup_type_photo-scaled"
  }

  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }

  _handleEscKey = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      this.closePopUp();
    }
  }

  openPopUp () {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscKey);
  }

  closePopUp () {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscKey);
  }

  setPopupEventListeners() {
      this._popup.addEventListener("mousedown", () => {
        this.closePopUp();
        });
      this._closeButton.addEventListener("mousedown", () => {
        this.closePopUp();
      })
  }
}
