import "./../pages/index.css";
import Card from "./card";
import { validationConfig, config, cardListSection, profileAvatar } from "./jsConstant";
import { enableValidation } from "./validation";
import { setEventListenersProfile, createProfileFromServer } from "./profile";
import { setEventListenersPhoto } from "./photo";
import { setPopupEventListeners } from "./modals";
import Api from "./api";
import Section from "./Section";
import Popup from "./Popup";

export let userId = "";

export const api = new Api (config);

const popupProfileAvatar = new Popup (Popup.selectors.profileAvatar);
popupProfileAvatar.setPopupEventListeners();

profileAvatar.addEventListener("click", () => {
  popupProfileAvatar.openPopUp();
});

api.getAllData()
  .then(([profileData, cardsData]) => {
    createProfileFromServer(profileData);
    userId = profileData._id;
    return cardsData;
  })
  .then((cardsData)=>{
    const cardList = new Section({
      data: cardsData,
      renderer: (cardItem) => {
        const cardClass = new Card (cardItem, "#element-template", api);
        const card = cardClass.generate();

        cardList.setItem(card);
        },
      },
      cardListSection
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

/*enableValidation(validationConfig);
setPopupEventListeners();
setEventListenersProfile();
setEventListenersPhoto();
*/
