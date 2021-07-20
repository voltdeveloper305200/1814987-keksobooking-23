import {
  activate as activateAdvertsForm,
  deactivate as deactivateAdvertsForm,
  setAddress,
  setUserFormSubmit,
  resetForm,
  resetButton
} from './adverts-form.js';
import {
  activate as activateFilterForm,
  deactivate as deactivateFilterForm,
  getFilteredAds,
  mapFilterForm
} from './filter-form.js';
import {initMap, renderAdMarkers, resetMap, removeAdMarkers} from './map.js';
import {getData} from './api.js';
import {openPopup, PopupType} from './popup.js';
import {debounce} from './util.js';

let adsData = null;

const onFilterChange = debounce((adverts) => {
  removeAdMarkers();
  renderAdMarkers(getFilteredAds(adverts));
});

const activateApp = () => {
  activateAdvertsForm();
  getData((adverts) => {
    adsData = adverts;
    renderAdMarkers(getFilteredAds(adverts));
    activateFilterForm();
    mapFilterForm.addEventListener('change', () => {
      onFilterChange(adverts);
    });
  });
};

const deactivateApp = () => {
  deactivateAdvertsForm();
  deactivateFilterForm();
};

const resetApp = () => {
  resetMap();
  resetForm();
  mapFilterForm.reset();
  removeAdMarkers();
  renderAdMarkers(getFilteredAds(adsData));
};

deactivateApp();

initMap(activateApp, (coords) => {
  setAddress(coords.lat, coords.lng);
});

const onFormSubmitSuccess = () => {
  openPopup(PopupType.SUCCESS);
  resetApp();
};

const onFormSubmitError = () => {
  openPopup(PopupType.ERROR);
};

setUserFormSubmit(onFormSubmitSuccess, onFormSubmitError);

resetButton.addEventListener('click', resetApp);
