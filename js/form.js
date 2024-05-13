const MIN_COUNT_TITLE_CHARACTERS = 30;
const MAX_COUNT_TITLE_CHARACTERS = 100;
const MAX_PRICE = 100000;

const MIN_PRICE_RESIDENCY = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElement = adForm.querySelectorAll('.ad-form__element');

const mapFilters = document.querySelector('.map__filters');
const mapFilterElement = mapFilters.querySelectorAll('.map__filter');
const mapFeature = mapFilters.querySelector('.map__features');

const adFormTitle = document.querySelector('#title');
const adFormPrice = document.querySelector('#price');
const adFormRoomNumber = document.querySelector('#room_number');
const adFormCapacity = document.querySelector('#capacity');
const adFormHousingType = document.querySelector('#type');
const adFormTimeIn = document.querySelector('#timein');
const adFormTimeOut = document.querySelector('#timeout');

const inactiveAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled', true);
  adFormElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const inactiveMap = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilterElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFeature.setAttribute('disabled', true);
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled', true);
  adFormElement.forEach((element) => {
    element.removeAttribute('disabled', true);
  });
};

const activateMap = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilterElement.forEach((element) => {
    element.removeAttribute('disabled', true);
  });
  mapFeature.removeAttribute('disabled', true);
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

pristine.addValidator(adFormPrice, isValidPrice, errorMessage);

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
      return adFormCapacity.value === '2' || adFormCapacity.value === '1' ;
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    evt.preventDefault();
    inactiveAdForm();
    inactiveMap();
  } else {
    return activateAdForm(), activateMap();
  }
});

export { inactiveAdForm, inactiveMap, activateAdForm, activateMap };
