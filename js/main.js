// import { generateArray } from './data.js';
// import { generatePopup } from './generation-template.js';
import { inactiveAdForm, inactiveMap, activateAdForm, activateMap, setFormSubmit } from './form.js';
import { renderMap } from './map.js';
import { getData } from './api.js';
import { getErrorMessage } from './messages.js';

inactiveAdForm();
inactiveMap();
const bootstrappApp = async () => {
  try {
    const popups = await getData();
    activateMap();
    renderMap(popups, activateAdForm);
    setFormSubmit();
  } catch (error) {
    getErrorMessage(error.message);
  }
};

bootstrappApp();
