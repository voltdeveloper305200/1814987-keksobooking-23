import {HouseType} from './constants.js';

const advertsTemplate = document.querySelector('#card').content.querySelector('.popup');
const offerTypeDisplay = {
  [HouseType.FLAT]: 'Квартира',
  [HouseType.BUNGALOW]: 'Бунгало',
  [HouseType.HOUSE]: 'Дом',
  [HouseType.PALACE]: 'Дворец',
  [HouseType.HOTEL]: 'Отель',
};

// Функция проверки данных и наполнения DOM
const checkAndFillData = (data, element, dataString) =>{
  if (!data) {
    element.remove();
  } else {
    element.textContent = dataString;
  }
};

// Функция рендеринга объявления
const renderAdvertCard = (advert) => {
  const cloneTemplate = advertsTemplate.cloneNode(true);
  const avatarEl = cloneTemplate.querySelector('.popup__avatar');
  const titleEl = cloneTemplate.querySelector('.popup__title');
  const addressEL = cloneTemplate.querySelector('.popup__text--address');
  const priceEL = cloneTemplate.querySelector('.popup__text--price');
  const typeEL = cloneTemplate.querySelector('.popup__type');
  const roomsAndGuestsEL = cloneTemplate.querySelector('.popup__text--capacity');
  const checkinAndCheckoutEL = cloneTemplate.querySelector('.popup__text--time');
  const featuresEl = cloneTemplate.querySelector('.popup__features');
  const descriptionEl = cloneTemplate.querySelector('.popup__description');
  const photosEl = cloneTemplate.querySelector('.popup__photos');
  avatarEl.src = advert.author.avatar;
  checkAndFillData(advert.offer.title, titleEl, advert.offer.title);
  checkAndFillData(advert.offer.address, addressEL, advert.offer.address);
  checkAndFillData(advert.offer.price, priceEL, `${advert.offer.price} Р/Ночь`);
  checkAndFillData(advert.offer.type, typeEL, offerTypeDisplay[advert.offer.type]);
  checkAndFillData(advert.offer.rooms, roomsAndGuestsEL, `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`);
  checkAndFillData(advert.offer.checkin, checkinAndCheckoutEL, `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`);
  checkAndFillData(advert.offer.description, descriptionEl, advert.offer.description);
  featuresEl.innerHTML = '';
  if (!advert.offer.features) {
    featuresEl.remove();
  } else {
    advert.offer.features.forEach((feature) => {
      const li = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresEl.appendChild(li);
    });
  }
  photosEl.innerHTML = '';
  if (advert.offer.photos) {
    advert.offer.photos.forEach ((photo) => {
      const img = document.createElement('img');
      img.src = photo;
      img.height = 40;
      img.width = 45;
      img.classList.add('popup__photo');
      img.alt = 'Фотография жилья';
      photosEl.appendChild(img);
    });
  }
  return cloneTemplate;
};

export {renderAdvertCard};

