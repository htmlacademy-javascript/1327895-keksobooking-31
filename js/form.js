// import { isEscapeKey } from './utils.js';
import { sendErrorMessage, sendMessage } from './messages.js';
import { resetPinMarker } from './map.js';
import { sendData } from './api.js';

const MIN_COUNT_TITLE_CHARACTERS = 30;
const MAX_COUNT_TITLE_CHARACTERS = 100;
const MAX_PRICE = 100000;
const MIN_PRICE = 0;

const MIN_PRICE_RESIDENCY = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
const adFormTitle = adForm.querySelector('#title');
const adFormPrice = adForm.querySelector('#price');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormHousingType = adForm.querySelector('#type');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const submitButton = adForm.querySelector('.ad-form__submit');

// const mapFilters = document.querySelector('.map__filters');
// const mapFilterElement = mapFilters.querySelectorAll('.map__filter');
// const mapFeatures = mapFilters.querySelector('.map__features');

const inactiveAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled', true);
  adFormElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled');
  adFormElement.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
});

const isValidTitle = (value) =>
  value.length >= MIN_COUNT_TITLE_CHARACTERS && value.length <= MAX_COUNT_TITLE_CHARACTERS;

pristine.addValidator(adFormTitle, isValidTitle, `Введите от ${MIN_COUNT_TITLE_CHARACTERS} до ${MAX_COUNT_TITLE_CHARACTERS} символов`);


let errorMessage = '';

const isValidPrice = (value) => {
  if (value > MAX_PRICE) {
    errorMessage = `Максимальная цена не более ${MAX_PRICE}`;
    return false;
  }

  if (value.length && parseInt(value, 10) < MIN_PRICE_RESIDENCY[adFormHousingType.value]) {
    errorMessage = `Минимальная цена ${MIN_PRICE_RESIDENCY[adFormHousingType.value]}`;
    return false;
  }
  return true;
};

pristine.addValidator(adFormPrice, isValidPrice, () => errorMessage);

const onChangeHousingType = () => {
  adFormPrice.placeholder = MIN_PRICE_RESIDENCY[adFormHousingType.value];
  pristine.validate(adFormPrice);
};

adFormHousingType.addEventListener('change', onChangeHousingType);

const isValidRoomNumber = (value) => {
  switch (value) {
    case '1':
      return adFormCapacity.value === '1';
    case '2':
      return adFormCapacity.value === '2' || adFormCapacity.value === '1';
    case '3':
      return adFormCapacity.value === '3' || adFormCapacity.value === '2' || adFormCapacity.value === '1';
    case '100':
      return adFormCapacity.value === '0';
    default:
      return false;
  }
};

const onChangeRoomNumber = () => {
  pristine.validate(adFormRoomNumber);
};

const onChangeCapacity = () => {
  pristine.validate(adFormRoomNumber);
};

adFormRoomNumber.addEventListener('change', onChangeRoomNumber);
adFormCapacity.addEventListener('change', onChangeCapacity);

pristine.addValidator(adFormRoomNumber, isValidRoomNumber, 'Измените количество гостей или мест');

adFormTimeIn.addEventListener('change', () => {
  adFormTimeOut.value = adFormTimeIn.value;
});

adFormTimeOut.addEventListener('change', () => {
  adFormTimeIn.value = adFormTimeOut.value;
});

noUiSlider.create(adFormSlider, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  }
});

adFormSlider.noUiSlider.on('slide', () => {
  adFormPrice.value = adFormSlider.noUiSlider.get();
  pristine.validate(adFormPrice);
});

adFormPrice.addEventListener('input', (evt) => {
  adFormSlider.noUiSlider.set(evt.target.value);
  pristine.validate(adFormPrice);
});

adFormPrice.addEventListener('change', (evt) => {
  if (evt.target.value > MAX_PRICE) {
    adFormSlider.noUiSlider.reset();
  }
  adFormSlider.noUiSlider.set(evt.target.value);
});

const resetAdFormSlider = () => {
  adFormSlider.noUiSlider.set(MIN_PRICE);
};

const resetAdForm = () => {
  adForm.reset();
  resetAdFormSlider();
  resetPinMarker();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendMessage();
      pristine.reset();
      sendData(new FormData(evt.target))
        .then(resetAdForm)
        .catch(sendErrorMessage)
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

export { inactiveAdForm, activateAdForm, setFormSubmit };
