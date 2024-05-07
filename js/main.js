import { generateArray } from './data.js';
import { generatePopup } from './generation-template.js';
import { inactiveAdForm, inactiveMap, activateAdForm, activateMap } from './form.js';

generatePopup(generateArray()[0]);
inactiveAdForm();
inactiveMap();
activateAdForm();
activateMap();

