import {HouseType, MinPriceLimitMap} from './constants.js';

const QuantityRooms = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  HUNDRED: '100',
};

const QuantityPlaces = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  ZERO: '0',
};
const MAX_VALUE_INPUT = 1000000;
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const inputTitle = adForm.querySelector('#title');
const inputPrice = adForm.querySelector('#price');
const typeSelect = adForm.querySelector('#type');
const quantityRoomsSelect = adForm.querySelector('#room_number');
const quantityPlacesSelect = adForm.querySelector('#capacity');

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

  inputTitle.reportValidity();
});

// Цена
inputPrice.addEventListener('input',() =>{
  const valuePrice = Number(inputPrice.value);
  if (valuePrice >= MAX_VALUE_INPUT) {
    inputPrice.setCustomValidity('Цена слишком высокая');
  } else if(valuePrice < 0){
    inputPrice.setCustomValidity('Допустимы только положительные числа');
  }else{
    inputPrice.setCustomValidity('');
  }
  inputPrice.reportValidity();
});

// Тип жилья
typeSelect.addEventListener('change', (evt) => {
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
});


const validateCapacity = () =>{
  let error = '';
  if (quantityRoomsSelect.value === QuantityRooms.ONE && quantityPlacesSelect.value !== QuantityPlaces.ONE) {
    error = '1 комната только для 1 гостя';
  }else if(quantityRoomsSelect.value === QuantityRooms.TWO && (quantityPlacesSelect.value === QuantityPlaces.THREE
    || quantityPlacesSelect.value === QuantityPlaces.ZERO)){
    error = '2 комнаты для 1го или 2х гостей';
  }else if(quantityRoomsSelect.value === QuantityRooms.THREE && quantityPlacesSelect.value === QuantityPlaces.ZERO){
    error = '3 комнаты для 1го, 2х  или 3х гостей';
  }else if(quantityRoomsSelect.value === QuantityRooms.HUNDRED && quantityPlacesSelect.value !== QuantityPlaces.ZERO){
    error = '100 комнат не для гостей';
  }
  quantityPlacesSelect.setCustomValidity(error);
};

quantityRoomsSelect.addEventListener('change', validateCapacity);
quantityPlacesSelect.addEventListener('change', validateCapacity);

export {activate, deactivate};
