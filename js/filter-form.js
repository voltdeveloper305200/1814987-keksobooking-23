const ANY_VALUE = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const ADVERTS_COUNT = 10;
const PriceCategory = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormFieldsets = mapFilterForm.querySelectorAll('fieldset', 'select');
const houseTypeSelect = mapFilterForm.querySelector('#housing-type');
const priceSelect = mapFilterForm.querySelector('#housing-price');
const roomsSelect = mapFilterForm.querySelector('#housing-rooms');
const guestsSelect = mapFilterForm.querySelector('#housing-guests');
const featureCheckboxes = mapFilterForm.querySelectorAll('.map__checkbox');

const deactivate = () =>{
  mapFilterForm.classList.add('map__filters--disabled');
  mapFilterFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
};

const activate = () =>{
  mapFilterForm.classList.remove('map__filters--disabled');
  mapFilterFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

const filterByHouseType = (ad) => {
  const filterValue = houseTypeSelect.value;
  if (filterValue === ANY_VALUE) {
    return true;
  }
  return ad.offer.type === filterValue;
};

const filterByPrice = (ad) => {
  const filterValue = priceSelect.value;
  if (filterValue === ANY_VALUE) {
    return true;
  } else if (filterValue === PriceCategory.LOW) {
    return ad.offer.price <= MIN_PRICE;
  } else if (filterValue === PriceCategory.MIDDLE) {
    return ad.offer.price > MIN_PRICE && ad.offer.price < MAX_PRICE;
  } else if (filterValue === PriceCategory.HIGH) {
    return ad.offer.price >= MAX_PRICE;
  }
};

const filterByRooms = (ad) => {
  const filterValue = roomsSelect.value;
  if (filterValue === ANY_VALUE) {
    return true;
  }
  return Number(ad.offer.rooms) === Number(filterValue);
};

const filterByGuests = (ad) => {
  const filterValue = guestsSelect.value;
  if (filterValue === ANY_VALUE) {
    return true;
  }
  return Number(ad.offer.guests) === Number(filterValue);
};

const filterByFeatures = (ad) => Array.from(featureCheckboxes).every((checkbox) => {
  if (!checkbox.checked) {
    return true;
  }
  if (!ad.offer.features) {
    return false;
  }
  return ad.offer.features.includes(checkbox.value);
});

const getFilteredAds = (adverts) => {
  const result = adverts.filter((ad) => filterByHouseType(ad) &&
filterByPrice(ad) &&
filterByRooms(ad) &&
filterByGuests(ad) &&
filterByFeatures(ad));
  return result.slice(0, ADVERTS_COUNT);
};


export {activate, deactivate, getFilteredAds, mapFilterForm};
