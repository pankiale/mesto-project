import "./../pages/index.css";
import { createInitialSetOfCards } from "./card";
import { validationConfig } from "./jsConstant";
import { enableValidation } from "./validation";
import { setEventListenersProfile, createProfileFromServer } from "./profile";
import { setEventListenersPhoto } from "./photo";
import { setPopupEventListeners } from "./modals";
import { getAllCards, getProfileData } from "./api";
export let userId = "";

Promise.all([getProfileData(), getAllCards()])
  .then(([profileData, cardsData]) => {
    createProfileFromServer(profileData);
    userId = profileData._id;
    createInitialSetOfCards(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
setPopupEventListeners();
setEventListenersProfile();
setEventListenersPhoto();
