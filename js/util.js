// Случайное целое число
// Взято с https://learn.javascript.ru
// "Ошибку" добавил от себя)

const ALERT_SHOW_TIME = 5000;

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

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, getRandomFractNumber, isEscEvent, isEnterEvent, showAlert};
