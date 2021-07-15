import{isEnterEvent, isEscEvent} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


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

const openErrorPopup = () => {
  activePopup = errorTemplate.cloneNode(true);
  document.body.appendChild(activePopup);
  activePopup.addEventListener('click', closePopup);
  document.addEventListener('keydown', onKeyPress);
};

const openSuccessPopup = () => {
  activePopup = successTemplate.cloneNode(true);
  document.body.appendChild(activePopup);
  activePopup.addEventListener('click', closePopup);
  document.addEventListener('keydown', onKeyPress);
};

export {openSuccessPopup, openErrorPopup};
