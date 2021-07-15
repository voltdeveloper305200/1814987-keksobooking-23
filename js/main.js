import './card-adverts.js';
import {activate as activateAdvertsForm, deactivate as deactivateAdvertsForm} from './adverts-form.js';
import { setAddress, setUserFormSubmit} from './adverts-form.js';
import {activate as activateFilterForm, deactivate as deactivateFilterForm} from './filter-form.js';
import {initMap, renderAdMarkers} from './map.js';
import {getData} from './api.js';
import {openErrorPopup, openSuccessPopup} from './popup.js';

const ADVERTS_COUNT = 10;

const activateApp = () => {
  activateAdvertsForm();
  activateFilterForm();
};

const deactivateApp = () => {
  deactivateAdvertsForm();
  deactivateFilterForm();
};

deactivateApp();

initMap(activateApp, (coords) => {
  setAddress(coords.lat.toFixed(5), coords.lng.toFixed(5));
});

getData((adverts) => {
  renderAdMarkers(adverts.slice(0, ADVERTS_COUNT));
});

setUserFormSubmit(openSuccessPopup,openErrorPopup);

