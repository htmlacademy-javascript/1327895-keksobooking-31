const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElement = adForm.querySelectorAll('.ad-form__element');

const mapFilters = document.querySelector('.map__filters');
const mapFilterElement = mapFilters.querySelectorAll('.map__filter');
const mapFeature = mapFilters.querySelector('.map__features');

const inactiveAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled', true);
  adFormElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const inactiveMap = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilterElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFeature.setAttribute('disabled', true);
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled', true);
  adFormElement.forEach((element) => {
    element.removeAttribute('disabled', true);
  });
};

const activateMap = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilterElement.forEach((element) => {
    element.removeAttribute('disabled', true);
  });
  mapFeature.removeAttribute('disabled', true);
};

export { inactiveAdForm, inactiveMap, activateAdForm, activateMap };

