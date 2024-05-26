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

  const errorButton = errorArea.querySelector('.data-error__button');

  const closeAlert = (evt) => {
    if (isEscapeKey(evt) || evt.target === errorButton) {
      errorArea.remove();
      document.removeEventListener('click', closeAlert);
      document.removeEventListener('keydown', closeAlert);
    }
  };

  errorButton.addEventListener('click', () => {
    errorArea.remove();
    document.removeEventListener('click', closeAlert);
    document.removeEventListener('keydown', closeAlert);
  });

  document.addEventListener('keydown', closeAlert);
  document.addEventListener('click', closeAlert);
};

const setupAlert = (template, buttonClass) => {
  const newAlert = template.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = newAlert.querySelector(buttonClass);

  const closeAlert = (evt) => {
    if (isEscapeKey(evt) || evt.target === buttonAlert) {
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
  document.addEventListener('click', closeAlert);
};

const sendErrorMessage = () => {
  setupAlert(templateSendErrorAlert, '.error__button');
};

const sendMessage = () => {
  setupAlert(templateSendSuccessAlert, '.success__button');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelectorAll('.error').forEach((error) => {
      error.remove();
    });
    document.querySelectorAll('.success').forEach((success) => {
      success.remove();
    });
  }
};

const onWindowClick = (evt) => {
  if (!evt.target.closest('.body')) {
    document.querySelectorAll('.error').forEach((error) => {
      error.remove();
    });
    document.querySelectorAll('.success').forEach((success) => {
      success.remove();
    });
  }
};

document.addEventListener('keydown', onDocumentKeydown);
document.addEventListener('click', onWindowClick);

export { getErrorMessage, sendErrorMessage, sendMessage };
