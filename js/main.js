import './card-adverts.js';
import {activate as activateAdvertsForm, deactivate as deactivateAdvertsForm} from './adverts-form.js';
import { setAddress, setUserFormSubmit, resetForm, resetButton} from './adverts-form.js';
import {activate as activateFilterForm, deactivate as deactivateFilterForm} from './filter-form.js';
import {initMap, renderAdMarkers, resetMap} from './map.js';
import {getData} from './api.js';
import {openPopup, PopupType} from './popup.js';

const ADVERTS_COUNT = 10;

const activateApp = () => {
  activateAdvertsForm();
  getData((adverts) => {
    renderAdMarkers(adverts.slice(0, ADVERTS_COUNT));
    activateFilterForm();
  });
};

const deactivateApp = () => {
  deactivateAdvertsForm();
  deactivateFilterForm();
};

const resetApp = () => {
  resetMap();
  resetForm();
};

deactivateApp();

initMap(activateApp, (coords) => {
  setAddress(coords.lat, coords.lng);
});

const onFormSubmitSuccess = () => {
  openPopup(PopupType.SUCCESS);
};

const onFormSubmitError = () => {
  openPopup(PopupType.ERROR);
};

setUserFormSubmit(onFormSubmitSuccess, onFormSubmitError);

resetButton.addEventListener('click', resetApp);
