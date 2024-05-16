import { generateArray } from './data.js';
// import { generatePopup } from './generation-template.js';
import { inactiveAdForm, inactiveMap, activateAdForm, activateMap } from './form.js';
import { renderMap } from './map.js';
// generatePopup(generateDataPopup());
inactiveAdForm();
inactiveMap();
// activateAdForm();
activateMap();
renderMap(generateArray(), activateAdForm);

