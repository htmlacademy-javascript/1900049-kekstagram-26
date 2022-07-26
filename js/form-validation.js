import { sendData } from './api.js';
import { closeUploadImgModal } from './img-upload.js';
import { initTemplate } from './notifications.js';

const successTemplate = initTemplate('success');
const errorTemplate = initTemplate('error', () =>
  document.querySelector('.img-upload__label').click()
);

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT =5;

let pristine;
const hashtagValidator = function (value) {
  let areHashtagsCorrect = true;

  const hashtagsList = value.split(' ').filter((hashtag) => hashtag !== '');

  hashtagsList.forEach((hashtag) => {
    if (hashtag[0] !== '#') {
      areHashtagsCorrect = false;
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      areHashtagsCorrect = false;
    }
    if (!/^[a-z0-9]*$/.test(hashtag.substring(1).toLowerCase())) {
      areHashtagsCorrect = false;
    }
  });

  if (hashtagsList.length > MAX_HASHTAG_COUNT) {
    areHashtagsCorrect = false;
  }

  if ([...new Set(hashtagsList)].length !== hashtagsList.length) {
    areHashtagsCorrect = false;
  }

  return areHashtagsCorrect;
};

const initPristine = () => {
  const form = document.querySelector('.img-upload__form');

  Pristine.addValidator(
    'validate-hashtags',
    hashtagValidator,
    'Hashtag is not correct'
  );

  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (pristine.validate()) {
      sendData(
        () => {
          successTemplate.open();
          closeUploadImgModal();
        },
        () => {
          errorTemplate.open();
          closeUploadImgModal();
        },
        new FormData(event.target)
      );
    }
  });
};

export { initPristine };
