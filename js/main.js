// import { generateArray } from './data.js';
// import { generatePopup } from './generation-template.js';
import { inactiveAdForm, activateAdForm, setFormSubmit } from './form.js';
import { renderMap, closePopup } from './map.js';
import { getData } from './api.js';
import { getErrorMessage } from './messages.js';
import { inactiveMap, activateMap, applyHousingFilter } from './filters.js';
import { debounce } from './utils.js';
import { setupImageUploadListeners } from './loading-photo.js';

const bootstrappApp = async () => {
  try {
    const popups = await getData();
    inactiveAdForm();
    inactiveMap();
    activateMap();
    renderMap(popups, activateAdForm);
    closePopup();
    applyHousingFilter(popups, debounce);
    setFormSubmit();
    setupImageUploadListeners();
  } catch (error) {
    getErrorMessage(error.message);
  }
};

bootstrappApp();
