import {generateData} from './data.js';
import './card-adverts.js';
import {activate as activateAdvertsForm, deactivate as deactivateAdvertsForm} from './adverts-form.js';
import { setAddress } from './adverts-form.js';
import {activate as activateFilterForm, deactivate as deactivateFilterForm} from './filter-form.js';
import {initMap, renderAdMarkers} from './map.js';


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

renderAdMarkers(generateData());
