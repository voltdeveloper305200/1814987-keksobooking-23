import {getRandomInteger, getRandomFractNumber, getRandomEllementOfArr, getRandomArrSlice} from './util.js';

const HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_CHECKIN = ['12:00', '13:00', '14:00'];
const TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS =
['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TITLES = ['Hello world', 'Hola mundo', 'Ciao mondo', 'Dia duit ar domhan'];


// Основная функция генерации объектов
const generateData = () => {
  const result = [];
  for (let i = 1; i < 9; i++) {
    const lat = getRandomFractNumber(35.65000, 35.70000, 5);
    const lng = getRandomFractNumber(139.70000, 139.80000, 5);
    result.push({
      author: {
        avatar: `img/avatars/user0${i}.png`,
      },
      offer: {
        title: getRandomEllementOfArr(TITLES),
        address: `${lat}, ${lng}`,
        price: getRandomInteger(100, 1000),
        type: getRandomEllementOfArr(HOUSE_TYPES),
        rooms: getRandomInteger(1, 3),
        guests: getRandomInteger(1, 3),
        checkin: getRandomEllementOfArr(TIME_CHECKIN),
        checkout: getRandomEllementOfArr(TIME_CHECKOUT),
        features: getRandomArrSlice(FEATURES),
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, nemo. Doloremque temporibus cupiditate architecto eaque numquam nihil quis quos.',
        photos: getRandomArrSlice(PHOTOS),
      },
      location: { lat, lng },
    },
    );
  }
  return result;
};

export {generateData}