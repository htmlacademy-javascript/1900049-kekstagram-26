import { initCustomMessageTemplate, initTemplate } from './notifications.js';

const getDataFail = initCustomMessageTemplate('Failed to load the data!');
const loadingData = initTemplate('messages');

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => onSuccess(posts))
    .catch(() => getDataFail.open());
};

const sendData = (onSuccess, onFail, body) => {
  loadingData.open();
  fetch('https://26.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      loadingData.close();
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

export { getData, sendData };

initCustomMessageTemplate();
initTemplate();
