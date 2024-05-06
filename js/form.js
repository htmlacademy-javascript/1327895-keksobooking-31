const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilterElement = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const inactiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled', true);
  adFormElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('disabled');
  mapFilterElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFeatures.setAttribute('disabled', true);
};

export { inactiveForm };

