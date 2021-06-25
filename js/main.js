import {generateData} from './data.js';
import './card-adverts.js';
import {activate as activateAdvertsForm, deactivate as deactivateAdvertsForm} from './adverts-form.js';
import {activate as activateFilterForm, deactivate as deactivateFilterForm} from './filter-form.js';


const activateApp = () =>{
  activateAdvertsForm();
  activateFilterForm();
};

const deactivateApp = () =>{
  deactivateAdvertsForm();
  deactivateFilterForm();
};

generateData();

deactivateApp();
activateApp();


