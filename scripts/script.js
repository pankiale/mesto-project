const content = document.querySelector('.content');
const element = content.querySelector('.element');
const photoContainer = document.querySelector('.elements');
const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePhoto = document.querySelector('.popup__close-button_photo-card');
const buttonClosePhotoScaled = document.querySelector('.popup__close-button_photo-scaled');
const buttonCloseProfile = document.querySelector('.popup__close-button_avatar');
const buttonSubmitProfile = document.querySelector('.form_prof');
const buttonSubmitPhoto = document.querySelector('.form_photo');
const popupProfile = document.querySelector('.popup_type_avatar');
const popupPhoto = document.querySelector('.popup_type_photo-card');
const popupPhotoScaled = document.querySelector('.popup_type_photo-scaled');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.form__item_prof_title');
const jobInput = document.querySelector('.form__item_prof_subtitle');
const photoName = document.querySelector('.form__item_photo_title');
const photoLink = document.querySelector('.form__item_photo_link');
const photoTemplate = document.querySelector('#element-template').content;
let photoCard = undefined;


/*  задаем фунцию для добавления фотокарточки*/
function createPhoto(photoName, photoLink) {
  photoCard = photoTemplate.querySelector('.element').cloneNode(true);
  photoCard.querySelector('.element__title').textContent = photoName;
  photoCard.querySelector('.element__image').src = photoLink;
  photoCard.querySelector('.element__image').alt = photoName;
  return photoCard;
};

/*  задаем фунцию для отрисовки фотокарточки*/
function renderPhoto(photo) {
  photoContainer.prepend(photo);
};

/*  проверяем что контейнер элементс пустой и заполняем его 6 карточками.
цикл обратный чтобы сделать фунцию добавления карточи универсальной через prepend*/
if (element === null) {
  for (let i = initialCards.length - 1; i > -1; i -= 1) {
    const photoName = initialCards[i].name;
    const photoLink = initialCards[i].link;
    createPhoto(photoName, photoLink);
    renderPhoto(photoCard);
  }
};

/*  задаем фунцию открытия попап только для попап профиля забираем данные для формы из дом*/
function openPopUp(popupName) {
  popupName.classList.add('popup_open');
  if (popupName === popupProfile) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
};

/*  задаем фунцию закрытия попап только для попап профиля обнуляем данные в форме*/
function closePopUp(popupName) {
  popupName.classList.remove('popup_open');
  if (popupName === popupProfile) {
    nameInput.value = '';
    jobInput.value = '';
  }
};

/*  задаем фунцию сабмита данных*/
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(popupProfile);
};

/*обрабатывает фото карточку - забирает имя и ссылку из формы, передает их функции addphoto
(добавление фотокарточки на страницу) и обнуляет поля имя и ссылка в форме затем вызывает closePopUp*/
function photoFormSubmitHandler(evt) {
  evt.preventDefault();
  createPhoto(photoName.value, photoLink.value);
  renderPhoto(photoCard);
  photoName.value = '';
  photoLink.value = '';
  closePopUp(popupPhoto);
};

/*  слушатели событий кроме работы с карточками*/
buttonEditProfile.addEventListener('click', openPopUp.bind(null, popupProfile));
buttonAddPhoto.addEventListener('click', openPopUp.bind(null, popupPhoto))
buttonCloseProfile.addEventListener('click', closePopUp.bind(null, popupProfile));
buttonClosePhoto.addEventListener('click', closePopUp.bind(null, popupPhoto));
buttonClosePhotoScaled.addEventListener('click', closePopUp.bind(null, popupPhotoScaled));
buttonSubmitProfile.addEventListener('submit', profileFormSubmitHandler);
buttonSubmitPhoto.addEventListener('submit', photoFormSubmitHandler);

/* один слушатель чтобы избежать большого числа слушателей если пользователь создаст много фотокарточек
ставим лайки  удаляем карточки и открываем карточки на большой экран*/
photoContainer.addEventListener('click', function (event) {
  if (event.target.className.includes('element__like-button')) {
    event.target.classList.toggle('element__like-button_active');
  }
  if (event.target.className.includes('element__delete-button')) {
    event.target.closest('.element').remove();
  }
  if (event.target.className === 'element__image') {
    document.querySelector('.popup__title').textContent = event.target.alt;
    document.querySelector('.popup__image-scaled').src = event.target.src;
    document.querySelector('.popup__image-scaled').alt = event.target.alt;
    openPopUp(popupPhotoScaled);
  }
});

