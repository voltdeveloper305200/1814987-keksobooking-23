const HouseType = {
  FLAT: 'flat',
  BUNGALOW: 'bungalow',
  HOTEL: 'hotel',
  HOUSE: 'house',
  PALACE: 'palace',
};

const MinPriceLimitMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 1000,
};


export {HouseType, MinPriceLimitMap};
