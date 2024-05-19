// const getRandomNumber = (minValue, maxValue) => {
//   const lower = Math.ceil(Math.min(Math.abs(minValue), Math.abs(maxValue)));
//   const upper = Math.ceil(Math.max(Math.abs(minValue), Math.abs(maxValue)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const getRandomFractionNumber = (minValue, maxValue) => {
//   const lower = Math.min(minValue, maxValue);
//   const upper = Math.max(minValue, maxValue);
//   const range = upper - lower;

//   const randomNumber = Math.random() * range + lower;
//   return randomNumber.toFixed(5);
// };

// const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// const getRandomSubarray = (array, min, max) => {
//   const count = getRandomNumber(min, max);
//   const shuffledArray = [...array].sort(() => 0.5 - Math.random());
//   return shuffledArray.slice(0, count);
// };

const DEBOUNCE_DELAY = 500;

const errorLoadDataTemplate = document.querySelector('#data-error').content;

const body = document.body;

const getErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__message').textContent = message;
  }

  body.append(errorArea);
};

const sendErrorMessage = () => {
  const templateSendErrorAlert = document.querySelector('#error').content;
  const newAlert = templateSendErrorAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = document.body.querySelector('.error__button');
  buttonAlert.addEventListener('click', () => {
    newAlert.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && evt.target !== newAlert) {
      newAlert.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== templateSendErrorAlert) {
      newAlert.remove();
    }
  });
};

const sendMessage = () => {
  const templateSendAlert = document.querySelector('#success').content;
  const newAlert = templateSendAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = document.body.querySelector('.success__button');
  buttonAlert.addEventListener('click', () => {
    newAlert.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && evt.target !== newAlert) {
      newAlert.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== templateSendAlert) {
      newAlert.remove();
    }
  });
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, getErrorMessage, sendErrorMessage, sendMessage, debounce };


// export { getRandomNumber, getRandomArrayElement, getRandomSubarray, getRandomFractionNumber, isEscapeKey};

