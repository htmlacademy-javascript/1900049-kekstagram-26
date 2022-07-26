import { initCustomMessageTemplate, initTemplate } from './notifications.js';

const getDataFail = initCustomMessageTemplate('Failed to load the data!');
const loadingData = initTemplate('messages');
const API_WAY = 'https://26.javascript.pages.academy/kekstagram';
const API_WAY_DATA = 'https://26.javascript.pages.academy/kekstagram/data';

const getData = (onSuccess) => {
  fetch(API_WAY_DATA)
    .then((response) => response.json())
    .then((posts) => onSuccess(posts))
    .catch(() => getDataFail.open());
};

const sendData = (onSuccess, onFail, body) => {
  loadingData.open();
  fetch(API_WAY, {
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
