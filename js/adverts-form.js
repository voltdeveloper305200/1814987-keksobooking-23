const MAX_INPUT_PRICE = 1000000;
const MinPriceLimitMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
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
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');

const deactivate = () =>{
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
};

const activate = () =>{
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

inputTitle.addEventListener('input', () =>{
  const valueLength = inputTitle.value.length;

  if (valueLength < 30) {
    inputTitle.setCustomValidity(`Ещё ${  30 - valueLength } симв.`);
  } else if (valueLength > 100) {
    inputTitle.setCustomValidity(`Удалите лишние ${  valueLength - 100 } симв.`);
  } else {
    inputTitle.setCustomValidity('');
  }
});

const validatePrice = () => {
  const minPrice = MinPriceLimitMap[typeSelect.value];
  let error = '';
  const valuePrice = Number(inputPrice.value);
  inputPrice.placeholder = minPrice;

  if (valuePrice >= MAX_INPUT_PRICE) {
    error = 'Цена слишком высокая';
  }else if (valuePrice < 0) {
    error = 'Допустимы только положительные числа';
  }else if (valuePrice < minPrice) {
    error = 'Цена меньше минимальной';
  }
  inputPrice.setCustomValidity(error);
};

const validateCapacity = () =>{
  let error = '';
  if (roomsSelect.value === RoomsQuantity.ONE && placesSelect.value !== PlacesQuantity.ONE) {
    error = '1 комната только для 1 гостя';
  }else if (roomsSelect.value === RoomsQuantity.TWO && (placesSelect.value === PlacesQuantity.THREE
    || placesSelect.value === PlacesQuantity.ZERO)){
    error = '2 комнаты для 1го или 2х гостей';
  }else if (roomsSelect.value === RoomsQuantity.THREE && placesSelect.value === PlacesQuantity.ZERO){
    error = '3 комнаты для 1го, 2х  или 3х гостей';
  }else if (roomsSelect.value === RoomsQuantity.HUNDRED && placesSelect.value !== PlacesQuantity.ZERO){
    error = '100 комнат не для гостей';
  }
  placesSelect.setCustomValidity(error);
};

timeInSelect.addEventListener('change', (evt) => {
  timeOutSelect.value = evt.target.value;
});

timeOutSelect.addEventListener('change', (evt) => {
  timeInSelect.value = evt.target.value;
});

inputPrice.addEventListener('input', validatePrice);
typeSelect.addEventListener('change', validatePrice);
roomsSelect.addEventListener('change', validateCapacity);
placesSelect.addEventListener('change', validateCapacity);

export {activate, deactivate};
