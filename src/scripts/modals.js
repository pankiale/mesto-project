import { validationConfig } from "./jsConstant";
import { toggleButtonState } from "./validation";

function escHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const popup = document.querySelector('.popup_open');
    closePopUp(popup);
    document.removeEventListener('keydown', escHandler);
  };
}

function clickHandler (evt) {
  if (evt.target.classList.contains('popup_open')) {
    const popup = document.querySelector('.popup_open');
    closePopUp(popup);
    document.removeEventListener('click', clickHandler);
  };
}

/*  задаем фунцию открытия попап только для попап профиля забираем данные для формы из дом*/
export function openPopUp(popupName) {
  const submitButton = popupName.querySelector(validationConfig.submitButtonSelector);
  console.log(popupName);
  popupName.classList.add('popup_open');
  document.addEventListener('keydown', escHandler);
  document.addEventListener('click', clickHandler);
  if(!popupName.classList.contains('popup_type_photo-scaled')){
    toggleButtonState(submitButton, false, validationConfig);
  }
};

/*  задаем фунцию закрытия попап только для попап профиля обнуляем данные в форме*/
export function closePopUp(popupName) {
  popupName.classList.remove('popup_open');
};

