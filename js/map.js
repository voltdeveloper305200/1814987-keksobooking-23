import {adForm} from './adverts-form.js';
import {generateData} from './data.js';
import {getRandomEllementOfArr} from './util.js';
import {HouseType} from './constants.js';

const map = L.map('map-canvas');
const addressInput = adForm.querySelector('#address');
const advertsTemplate = document.querySelector('#card').content.querySelector('.popup');
const adverts = generateData();
const randomAdvert = getRandomEllementOfArr(adverts);
const offerTypeDisplay = {
  [HouseType.FLAT]: 'Квартира',
  [HouseType.BUNGALOW]: 'Бунгало',
  [HouseType.HOUSE]: 'Дом',
  [HouseType.PALACE]: 'Дворец',
  [HouseType.HOTEL]: 'Отель',
};
const latting = generateData();

const checkAndFillData = (data, element, dataString) =>{
  if (!data) {
    element.remove();
  } else {
    element.textContent = dataString;
  }
};

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
  advert.offer.features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature', `popup__feature--${feature}`);
    featuresEl.appendChild(li);
  });
  photosEl.innerHTML = '';
  advert.offer.photos.forEach ((photo) => {
    const img = document.createElement('img');
    img.src = photo;
    img.height = 40;
    img.width = 45;
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    photosEl.appendChild(img);
  });
  return cloneTemplate;
};

const initMap = (onMapLoad) => {
  map
    .on('load', onMapLoad)
    .setView({
      lat: 35.6895,
      lng: 139.69171,
    }, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const addMainMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainPinMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.69171,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    addressInput.value = evt.target.getLatLng();
  });
};

const addMarkers = () => {
  latting.forEach((elem) => {
    const icon = L.icon({
      iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const lattingLat = elem.location.lat;
    const lattingLng = elem.location.lng;
    const marker = L.marker(
      {
        lat: lattingLat,
        lng:lattingLng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(renderAdvertCard(randomAdvert),
        {
          keepInView: true,
        },
      );
  });
};

export {initMap, addMainMarker, addMarkers};

