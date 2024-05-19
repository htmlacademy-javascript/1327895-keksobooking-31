// import { generateArray } from './data.js';
import { generatePopup } from './generation-template.js';
import { inactiveAdForm, inactiveMap, activateAdForm, activateMap } from './form.js';
import { renderMap } from './map.js';
import { getData } from './api.js';
import { getErrorMessage } from './utils.js';

// generatePopup(generateDataPopup());
inactiveAdForm();
inactiveMap();
// renderMap(generateArray(), activateAdForm);
async function bootstrappApp() {
  try {
    const popups = await getData();
    generatePopup(popups);
    renderMap(popups, activateAdForm);
    activateAdForm();
    activateMap();
  } catch (error) {
    getErrorMessage(error.message);
  }
}

bootstrappApp();
