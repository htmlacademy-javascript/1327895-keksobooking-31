import { updatePointsMarkers } from './map.js';
const DEBOUNCE_DELAY = 500;

const Price = {
  'any': {min: 0, max: 100000},
  'low': {min: 0, max: 10000},
  'middle': {min: 10000, max: 50000},
  'high': {min: 50000, max: 100000},
};

const mapFilters = document.querySelector('.map__filters');
const mapFilterElement = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
const housingTypeSelect = document.querySelector('#housing-type');
const housingPriceSelect = document.querySelector('#housing-price');
const housingRoomsSelect = document.querySelector('#housing-rooms');
const housingGuestsSelect = document.querySelector('#housing-guests');

const inactiveMap = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilterElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFeatures.setAttribute('disabled', true);
};

const activateMap = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilterElement.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFeatures.removeAttribute('disabled');
};

const filterFeatures = (point) => {
  const checkedFeatures = Array.from(mapFilters.querySelectorAll('.map__checkbox:checked'), (input) => input.value);
  return checkedFeatures.every((feature) => point.offer.features?.includes(feature));
};

const applyFilters = (points) => points
  .filter((point) => housingTypeSelect[0].selected || point.offer?.type === housingTypeSelect.value)
  .filter((point) => housingPriceSelect[0].selected || point.offer?.price <= Price[housingPriceSelect.value].max && point.offer?.price >= Price[housingPriceSelect.value].min)
  .filter((point) => housingRoomsSelect[0].selected || point.offer?.rooms === Number(housingRoomsSelect.value))
  .filter((point) => housingGuestsSelect[0].selected || point.offer?.guests === Number(housingGuestsSelect.value))
  .filter((point) => filterFeatures(point));

let initialPointsData;

const applyHousingFilter = (points, delayFunction) => {
  initialPointsData = points;

  const updateFilteredMarkers = delayFunction(() => updatePointsMarkers(applyFilters(points)), DEBOUNCE_DELAY);
  mapFilters.addEventListener('change', updateFilteredMarkers);
};


const resetFilters = () => {
  mapFilters.reset();
  applyHousingFilter(initialPointsData);
};

export { inactiveMap, activateMap, applyHousingFilter, resetFilters };

