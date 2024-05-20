const DEBOUNCE_DELAY = 500;

// const errorLoadDataTemplate = document.querySelector('#data-error').content;

// const body = document.body;

// const getErrorMessage = (message) => {
//   const errorArea = errorLoadDataTemplate.cloneNode(true);
//   if (message) {
//     errorArea.querySelector('.data-error__message').textContent = message;
//   }

//   body.append(errorArea);
// };

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

export { isEscapeKey, sendErrorMessage, sendMessage, debounce };


// export { getRandomNumber, getRandomArrayElement, getRandomSubarray, getRandomFractionNumber, isEscapeKey};

