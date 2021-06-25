const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormFieldsets = mapFilterForm.querySelectorAll('fieldset', 'select');

// Функция, делающая форму неактивной

const deactivate = () =>{
  mapFilterForm.classList.add('map__filters--disabled');
  mapFilterFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
};

// Функция, делающая форму активной

const activate = () =>{
  mapFilterForm.classList.remove('map__filters--disabled');
  mapFilterFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

export {activate, deactivate};
