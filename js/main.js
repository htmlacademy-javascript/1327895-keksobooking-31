import { inactiveAdForm, activateAdForm, setFormSubmit } from './form.js';
import { initMap, renderMap } from './map.js';
import { getData } from './api.js';
import { getErrorMessage } from './messages.js';
import { inactiveMap, activateMap, applyHousingFilter } from './filters.js';
import { debounce } from './utils.js';
import { setupImageUploadListeners } from './loading-photo.js';

inactiveAdForm();
inactiveMap();
initMap(activateAdForm);

const bootstrappApp = async () => {
  try {
    const popups = await getData();
    activateMap();
    renderMap(popups);
    applyHousingFilter(popups, debounce);
    setFormSubmit();
    setupImageUploadListeners();
  } catch (error) {
    getErrorMessage(error.message);
  }
};

bootstrappApp();
