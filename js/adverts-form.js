import {HouseType} from './constants.js';

const MAX_INPUT_PRICE = 1000000;
const MinPriceLimitMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 1000,
};
const RoomsQuantity = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  HUNDRED: '100',
};

const PlacesQuantity = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  ZERO: '0',
};
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const inputTitle = adForm.querySelector('#title');
const inputPrice = adForm.querySelector('#price');
const typeSelect = adForm.querySelector('#type');
const roomsSelect = adForm.querySelector('#room_number');
const placesSelect = adForm.querySelector('#capacity');

// Функция, делающая форму неактивной

const deactivate = () =>{
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
};

// Функция, делающая форму активной

const activate = () =>{
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

// Валидация формы

// Заголовок
inputTitle.addEventListener('input', () =>{
  const valueLength = inputTitle.value.length;
  if (valueLength < 30) {
    inputTitle.setCustomValidity(`Ещё ${  30 - valueLength } симв.`);
  } else if(valueLength > 100){
    inputTitle.setCustomValidity(`Удалите лишние ${  valueLength - 100 } симв.`);
  } else{
    inputTitle.setCustomValidity('');
  }
});

// Цена
inputPrice.addEventListener('input',() =>{
  const valuePrice = Number(inputPrice.value);
  let err = '';
  if (valuePrice >= MAX_INPUT_PRICE) {
    err = 'Цена слишком высокая';
  } else if(valuePrice < 0){
    err = 'Допустимы только положительные числа';
  }
  inputPrice.setCustomValidity(err);
});

// Тип жилья
const setPricePlaceholder = (evt) => {
  if (evt.target.value === HouseType.FLAT) {
    inputPrice.placeholder = MinPriceLimitMap.flat;
  }else if(evt.target.value ===  HouseType.BUNGALOW){
    inputPrice.placeholder = MinPriceLimitMap.bungalow;
  }else if(evt.target.value ===  HouseType.HOTEL){
    inputPrice.placeholder = MinPriceLimitMap.hotel;
  }else if(evt.target.value ===  HouseType.HOUSE){
    inputPrice.placeholder = MinPriceLimitMap.house;
  }else if(evt.target.value ===  HouseType.PALACE){
    inputPrice.placeholder = MinPriceLimitMap.palace;
  }
};

typeSelect.addEventListener('change', setPricePlaceholder);


const validateCapacity = () =>{
  let error = '';
  if (roomsSelect.value === RoomsQuantity.ONE && placesSelect.value !== PlacesQuantity.ONE) {
    error = '1 комната только для 1 гостя';
  }else if(roomsSelect.value === RoomsQuantity.TWO && (placesSelect.value === PlacesQuantity.THREE
    || placesSelect.value === PlacesQuantity.ZERO)){
    error = '2 комнаты для 1го или 2х гостей';
  }else if(roomsSelect.value === RoomsQuantity.THREE && placesSelect.value === PlacesQuantity.ZERO){
    error = '3 комнаты для 1го, 2х  или 3х гостей';
  }else if(roomsSelect.value === RoomsQuantity.HUNDRED && placesSelect.value !== PlacesQuantity.ZERO){
    error = '100 комнат не для гостей';
  }
  placesSelect.setCustomValidity(error);
};

roomsSelect.addEventListener('change', validateCapacity);
placesSelect.addEventListener('change', validateCapacity);

export {activate, deactivate};
