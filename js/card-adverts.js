import {generateData} from './data.js';
import {getRandomEllementOfArr} from './util.js';


const map = document.querySelector('#map-canvas');
const advertsTemplate = document.querySelector('#card').content.querySelector('.popup');
const cloneTemplate = advertsTemplate.cloneNode(true);
const adverts = generateData();
const randomAdvert = getRandomEllementOfArr(adverts);


// Функция рендеринга объявления

const renderAdvertCard = (advert) => {
  const advertsAvatar = cloneTemplate.querySelector('.popup__avatar');
  const advertsTitle = cloneTemplate.querySelector('.popup__title');
  const advertsAddress = cloneTemplate.querySelector('.popup__text--address');
  const advertsPrice = cloneTemplate.querySelector('.popup__text--price');
  const advertsType = cloneTemplate.querySelector('.popup__type');
  const advertsRoomsAndGuests = cloneTemplate.querySelector('.popup__text--capacity');
  const advertsCheckinAndCheckout = cloneTemplate.querySelector('.popup__text--time');
  const advertsFeatures = cloneTemplate.querySelector('.popup__features');
  const advertsDescription = cloneTemplate.querySelector('.popup__description');
  const advertsPhotos = cloneTemplate.querySelector('.popup__photos');
  const offerTypeDisplay = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  const checkAndFillData = (data, element, dataString) =>{
    if (!data) {
      element.remove();
    } else {
      element.textContent = dataString;
    }
  };

  advertsAvatar.src = advert.author.avatar;
  checkAndFillData(advert.offer.title, advertsTitle, advert.offer.title);
  checkAndFillData(advert.offer.address, advertsAddress, advert.offer.address);
  checkAndFillData(advert.offer.price, advertsPrice, `${advert.offer.price} Р/Ночь`);
  checkAndFillData(advert.offer.type, advertsType, offerTypeDisplay[advert.offer.type]);
  checkAndFillData(advert.offer.rooms, advertsRoomsAndGuests, `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`);
  checkAndFillData(advert.offer.checkin, advertsCheckinAndCheckout, `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`);
  advertsFeatures.innerHTML = '';
  advert.offer.features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature', `popup__feature--${feature}`);
    advertsFeatures.appendChild(li);
  });
  checkAndFillData(advert.offer.description, advertsDescription, advert.offer.description);
  advertsPhotos.innerHTML = '';
  advert.offer.photos.forEach ((photo) => {
    const img = document.createElement('img');
    img.src = photo;
    img.height = 40;
    img.width = 45;
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    advertsPhotos.appendChild(img);
  });
  map.appendChild(cloneTemplate);
};

renderAdvertCard(randomAdvert);

