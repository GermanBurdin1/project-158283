const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);

};

const successTemplate = document.querySelector('#success');
const successSection = successTemplate.content.querySelector('.success');

const showSuccessMessage = () => {
  const success = successSection.cloneNode(true);
  const successButton = success.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    success.remove();
  });

  document.body.append(success);

  const successInner = document.querySelector('.success__inner');

  const clickHandler = (evt) => {
    if (!successInner.contains(evt.target)) {
      success.remove();
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      success.remove();
      document.removeEventListener('mousedown', clickHandler);
    }
  });

  document.addEventListener('mousedown', clickHandler);
};


const errorTemplate = document.querySelector('#error');
const errorSection = errorTemplate.content.querySelector('.error');

const showErrorMessage = () => {
  const error = errorSection.cloneNode(true);
  const errorButton = error.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    error.remove();
  });

  document.body.append(error);

  const errorInner = document.querySelector('.error__inner');

  const clickHandler = (evt) => {
    if (!errorInner.contains(evt.target)) {
      error.remove();
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      error.remove();
      document.removeEventListener('mousedown', clickHandler);
    }
  });

  document.addEventListener('mousedown', clickHandler);
};


function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
}


export { showAlert,showSuccessMessage, showErrorMessage, debounce };
