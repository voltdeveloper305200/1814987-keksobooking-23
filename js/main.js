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

console.log(getRandomInteger(1,5));


// Случайное число с плавающей точкой
// Попробовал написать сам, знаю что написал не особо правильно, но вроде работает

const getRandomFractNumber = function (min, max, _afterDot){
  if (min >= max) {
    throw new RangeError('Значение min не должно быть больше max');
  }
  if (min < 0 || max < 0) {
    throw new RangeError('Нужны только положительные числа');
  }
  const rand = min + Math.random() * (max + 1 - min);
  return (rand.toFixed(_afterDot));
};

console.log(getRandomFractNumber(1,5,5));
