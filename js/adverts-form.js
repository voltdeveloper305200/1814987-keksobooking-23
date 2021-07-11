const MAX_INPUT_PRICE = 1000000;
const MAX_TITLE_LENGTH = 100;
const MIN_TITLE_LENGTH = 30;
const MinPriceLimit = {
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
const priceInput = adForm.querySelector('#price');
const addressInput = adForm.querySelector('#address');
const typeSelect = adForm.querySelector('#type');
const roomsSelect = adForm.querySelector('#room_number');
const placesSelect = adForm.querySelector('#capacity');
const checkInSelect = adForm.querySelector('#timein');
const checkOutSelect = adForm.querySelector('#timeout');

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

const validateTitle = () =>{
  const titleLength = inputTitle.value.length;
  let error = '';
  if (titleLength < 30) {
    error = `Ещё ${  MIN_TITLE_LENGTH - titleLength } симв.`;
  } else if (titleLength > 100) {
    error = `Удалите лишние ${  titleLength - MAX_TITLE_LENGTH } симв.`;
  }
  inputTitle.setCustomValidity(error);
};

const validatePrice = () => {
  const minPrice = MinPriceLimit[typeSelect.value];
  let error = '';
  const priceValue = Number(priceInput.value);
  priceInput.placeholder = minPrice;

  if (priceValue >= MAX_INPUT_PRICE) {
    error = 'Цена слишком высокая';
  } else if (priceValue < minPrice) {
    error = 'Цена меньше минимальной';
  }
  priceInput.setCustomValidity(error);
};

const validateCapacity = () =>{
  let error = '';
  if (roomsSelect.value === RoomsQuantity.ONE && placesSelect.value !== PlacesQuantity.ONE) {
    error = '1 комната только для 1 гостя';
  } else if (roomsSelect.value === RoomsQuantity.TWO && (placesSelect.value === PlacesQuantity.THREE
    || placesSelect.value === PlacesQuantity.ZERO)){
    error = '2 комнаты для 1го или 2х гостей';
  } else if (roomsSelect.value === RoomsQuantity.THREE && placesSelect.value === PlacesQuantity.ZERO){
    error = '3 комнаты для 1го, 2х  или 3х гостей';
  } else if (roomsSelect.value === RoomsQuantity.HUNDRED && placesSelect.value !== PlacesQuantity.ZERO){
    error = '100 комнат не для гостей';
  }
  placesSelect.setCustomValidity(error);
};

const syncCheckInAndCheckOut = (evt) => {
  checkOutSelect.value = evt.target.value;
  checkInSelect.value = evt.target.value;
};

const setAddress = (lat, lng) => {
  addressInput.value = `${lat}, ${lng}`;
};

checkInSelect.addEventListener('change', syncCheckInAndCheckOut);
checkOutSelect.addEventListener('change', syncCheckInAndCheckOut);
inputTitle.addEventListener('input', validateTitle);
priceInput.addEventListener('input', validatePrice);
typeSelect.addEventListener('change', validatePrice);
roomsSelect.addEventListener('change', validateCapacity);
placesSelect.addEventListener('change', validateCapacity);

export {activate, deactivate, setAddress};
