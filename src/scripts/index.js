import './../pages/index.css';
import { createInitialSetOfCards } from './card';
import { validationConfig } from './jsConstant';
import { enableValidation } from './validation';
import { setEventListenersProfile } from './profile';
import { setEventListenersPhoto } from './photo';
import { setPopupEventListeners } from './modals';
import { getAllCards, addCard, removeCard, editCard } from './api'

getAllCards()
  .then((data) => {
    createInitialSetOfCards(data);
  });
enableValidation(validationConfig);
setPopupEventListeners();
setEventListenersProfile();
setEventListenersPhoto();
