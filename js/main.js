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



// Функции для создания сгенерированных объектов

const generateObjects = [];

for (let i = 1; i < 10; i++) {
  generateObjects.push({avatar: "img/avatars/user" + "0" + i + ".png}")
}

console.log(generateObjects);
