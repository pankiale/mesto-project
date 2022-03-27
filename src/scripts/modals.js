function handleEscKey (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const popup = document.querySelector('.popup_open');
    closePopUp(popup);
  };
}

function handleOverlayClick (evt) {
  if (evt.target.classList.contains('popup_open')) {
    closePopUp(evt.target);
  };
}

/*  задаем фунцию открытия попап только для попап профиля забираем данные для формы из дом*/
export function openPopUp(popupName) {
  popupName.classList.add('popup_open');
  document.addEventListener('keydown', handleEscKey);
  document.addEventListener('mousedown', handleOverlayClick);

};

/*  задаем фунцию закрытия попап только для попап профиля обнуляем данные в форме*/
export function closePopUp(popupName) {
  popupName.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEscKey);
  document.removeEventListener('mousedown', handleOverlayClick);
};

