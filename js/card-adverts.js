import {generateData} from './data.js';
import {getRandomEllementOfArr} from './util.js';

const map = document.querySelector('#map-canvas');
const advertsTemplate = document.querySelector('#card').content.querySelector('.popup');
const adverts = generateData();
const randomAdvert = getRandomEllementOfArr(adverts);
const offerTypeDisplay = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
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
  const AvatarEl = cloneTemplate.querySelector('.popup__avatar');
  const TitleEl = cloneTemplate.querySelector('.popup__title');
  const AddressEL = cloneTemplate.querySelector('.popup__text--address');
  const PriceEL = cloneTemplate.querySelector('.popup__text--price');
  const TypeEL = cloneTemplate.querySelector('.popup__type');
  const RoomsAndGuestsEL = cloneTemplate.querySelector('.popup__text--capacity');
  const CheckinAndCheckoutEL = cloneTemplate.querySelector('.popup__text--time');
  const FeaturesEl = cloneTemplate.querySelector('.popup__features');
  const DescriptionEl = cloneTemplate.querySelector('.popup__description');
  const PhotosEl = cloneTemplate.querySelector('.popup__photos');
  AvatarEl.src = advert.author.avatar;
  checkAndFillData(advert.offer.title, TitleEl, advert.offer.title);
  checkAndFillData(advert.offer.address, AddressEL, advert.offer.address);
  checkAndFillData(advert.offer.price, PriceEL, `${advert.offer.price} Р/Ночь`);
  checkAndFillData(advert.offer.type, TypeEL, offerTypeDisplay[advert.offer.type]);
  checkAndFillData(advert.offer.rooms, RoomsAndGuestsEL, `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`);
  checkAndFillData(advert.offer.checkin, CheckinAndCheckoutEL, `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`);
  checkAndFillData(advert.offer.description, DescriptionEl, advert.offer.description);
  FeaturesEl.innerHTML = '';
  advert.offer.features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature', `popup__feature--${feature}`);
    FeaturesEl.appendChild(li);
  });
  PhotosEl.innerHTML = '';
  advert.offer.photos.forEach ((photo) => {
    const img = document.createElement('img');
    img.src = photo;
    img.height = 40;
    img.width = 45;
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    PhotosEl.appendChild(img);
  });
  map.appendChild(cloneTemplate);
};

renderAdvertCard(randomAdvert);

