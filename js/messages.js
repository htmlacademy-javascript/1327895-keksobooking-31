import { isEscapeKey } from './utils.js';

const errorLoadDataTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const templateSendErrorAlert = document.querySelector('#error').content.querySelector('.error');
const templateSendSuccessAlert = document.querySelector('#success').content.querySelector('.success');
const body = document.body;

const getErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__message').textContent = message;
  }

  body.append(errorArea);
};

const setupAlert = (template, buttonClass) => {
  const newAlert = template.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = newAlert.querySelector(buttonClass);

  const closeAlert = (evt) => {
    if (isEscapeKey(evt) || evt.target !== newAlert) {
      newAlert.remove();
      document.removeEventListener('keydown', closeAlert);
      document.removeEventListener('click', closeAlert);
    }
  };

  buttonAlert.addEventListener('click', () => {
    newAlert.remove();
    document.removeEventListener('keydown', closeAlert);
    document.removeEventListener('click', closeAlert);
  });

  document.addEventListener('keydown', closeAlert);
  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.body')) {
      if (document.querySelector('.error')) {
        closeAlert(evt);
      }
    }
  });
};

const sendErrorMessage = () => {
  setupAlert(templateSendErrorAlert, '.error__button');
};

const sendMessage = () => {
  setupAlert(templateSendSuccessAlert, '.success__button');
};

export { getErrorMessage, sendErrorMessage, sendMessage };
