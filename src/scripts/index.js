import "./../pages/index.css";
import { createInitialSetOfCards } from "./card";
import { validationConfig, config } from "./jsConstant";
import { enableValidation } from "./validation";
import { setEventListenersProfile, createProfileFromServer } from "./profile";
import { setEventListenersPhoto } from "./photo";
import { setPopupEventListeners } from "./modals";
import Api from "./api";
export let userId = "";

export const api = new Api (config);


api.getAllData()
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
