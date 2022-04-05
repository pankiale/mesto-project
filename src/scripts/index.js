import './../pages/index.css';
import { createInitialSetOfCards } from './card';
import { validationConfig } from './jsConstant';
import { enableValidation } from './validation';
import { setEventListenersProfile, createProfileFromServer } from './profile';
import { setEventListenersPhoto } from './photo';
import { setPopupEventListeners } from './modals';
import { getAllCards, addCard, removeCard, editCard, getProfileData } from './api'

getProfileData()
  .then((data) => {
    createProfileFromServer(data);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

getAllCards()
  .then((data) => {
    createInitialSetOfCards(data);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

enableValidation(validationConfig);
setPopupEventListeners();
setEventListenersProfile();
setEventListenersPhoto();


