import './../pages/index.css';
import { createInitialSetOfCards } from './card';
import { validationConfig } from './jsConstant';
import { enableValidation } from './validation';
import { setEventListenersProfile } from './profile';
import { setEventListenersPhoto } from './photo';

createInitialSetOfCards();
enableValidation(validationConfig);
setEventListenersProfile();
setEventListenersPhoto();
