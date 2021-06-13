// Случайное целое число
// Взято с https://learn.javascript.ru
// "Ошибку" добавил от себя)

const getRandomInteger =  (min, max) => {
  if (min >= max) {
    throw new RangeError('Значение min не должно быть больше max');
  }
  if (min < 0 || max < 0) {
    throw new RangeError('Нужны только положительные числа');
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Случайное число с плавающей точкой
// Попробовал написать сам, знаю что написал не особо правильно, но вроде работает

const getRandomFractNumber =  (min, max, afterDot) => {
  if (min >= max) {
    throw new RangeError('Значение min не должно быть больше max');
  }
  if (min < 0 || max < 0) {
    throw new RangeError('Нужны только положительные числа');
  }
  const rand = min + Math.random() * (max + 1 - min);
  return (rand.toFixed(afterDot));
};

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
export {getRandomInteger, getRandomFractNumber, getRandomEllementOfArr, getRandomArrSlice};
