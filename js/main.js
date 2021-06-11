/* eslint-disable no-undef */
// Случайное целое число
// Взято с https://learn.javascript.ru
// "Ошибку" добавил от себя)

const getRandomInteger = function (min, max) {
  if (min >= max) {
    throw new RangeError('Значение min не должно быть больше max');
  }
  if (min < 0 || max < 0) {
    throw new RangeError('Нужны только положительные числа');
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

getRandomInteger(1,5);


// Случайное число с плавающей точкой
// Попробовал написать сам, знаю что написал не особо правильно, но вроде работает

const getRandomFractNumber = function (min, max, afterDot){
  if (min >= max) {
    throw new RangeError('Значение min не должно быть больше max');
  }
  if (min < 0 || max < 0) {
    throw new RangeError('Нужны только положительные числа');
  }
  const rand = min + Math.random() * (max + 1 - min);
  return (rand.toFixed(afterDot));
};

getRandomFractNumber(1,3,4);


// Функции для создания сгенерированных объектов

// Случайное значение массива
const getRandomEllementOfArr = (arr) => {
  const randomNameIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomNameIndex];
};

// Случайно порезанный массив
const getRandomArrSlice = (arr) => {
  const randomLength = getRandomInteger(1, arr.length - 1);
  return arr.slice(0,randomLength);
};


// Основная функция генерации объектов
const generateData = () => {
  const result = [];
  for (let i = 1; i < 9; i++) {
    const lat = getRandomFractNumber(35.65000, 35.70000, 5);
    const lng = getRandomFractNumber(139.70000, 139.80000, 5);
    result.push({
      author: {
        avatar: `img/avatars/user` + `0${i}.png`,
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
      location: {  lat, lng },
    },
    );
  }
  return result;
};

const data = generateData();

console.log(data);
