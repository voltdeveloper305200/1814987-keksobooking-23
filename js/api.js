import { showAlert } from './util.js';

const API_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      showAlert('Не удалось получить данные объявлений. Обновите страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body: body,
    },
  ) .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch((err) => {
      onFail(err);
    });
};

export {getData, sendData};
