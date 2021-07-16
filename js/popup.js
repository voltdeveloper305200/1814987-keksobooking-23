import {isEnterEvent, isEscEvent} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const PopupType = {
  ERROR: errorTemplate.cloneNode(true),
  SUCCESS: successTemplate.cloneNode(true),
};

let activePopup = null;

const closePopup = () => {
  activePopup.remove();
  activePopup.removeEventListener('click', closePopup);
  activePopup = null;
  document.removeEventListener('keydown', onKeyPress);
};

function onKeyPress(evt) {
  if (isEscEvent(evt) || isEnterEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

const openPopup = (type) => {
  activePopup = type;
  document.body.appendChild(activePopup);
  activePopup.addEventListener('click', closePopup);
  document.addEventListener('keydown', onKeyPress);
};


export {openPopup, PopupType};
