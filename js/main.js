import { generateArray } from './data.js';
import { generatePopup } from './generation-template.js';
import { inactiveForm } from './form.js';

generatePopup(generateArray()[0]);
inactiveForm();

