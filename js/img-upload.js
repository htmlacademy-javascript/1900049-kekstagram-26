/* Variables */

import { initPristine } from './form-validation.js';

const DEFAULT_ZOOM = 100;
let zoom = DEFAULT_ZOOM;
const ZOOM_STEP = 25;
const MIN_ZOOM = 25;
const MAX_ZOOM = 100;

const effects = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    effect: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    effect: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    effect: 'invert',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    effect: 'blur',
  },
  heat: {
    min: 0,
    max: 3,
    step: 0.1,
    effect: 'brightness',
  },
};

let sliderObject;

/* Selectors */
const bodyElement = document.querySelector('body');
const uploadImgModal = document.querySelector('.img-upload__overlay');
const unloadImgModalCross = uploadImgModal.querySelector('.img-upload__cancel');
const uploadFileInput = document.querySelector('.img-upload__input');
const uploadPreviewImg = uploadImgModal.querySelector(
  '.img-upload__preview img'
);
const minus = uploadImgModal.querySelector('.scale__control--smaller');
const plus = uploadImgModal.querySelector('.scale__control--bigger');
const zoomIndicator = uploadImgModal.querySelector('.scale__control--value');
const sliderContainerElement = uploadImgModal.querySelector('.effect-level');
const sliderElement = uploadImgModal.querySelector('.effect-level__slider');
const sliderValueInput = uploadImgModal.querySelector('.effect-level__value ');
const radioInputs = uploadImgModal.querySelectorAll('.effects__radio');
const hashtagInput = uploadImgModal.querySelector('.text__hashtags');
const descriptionInput = uploadImgModal.querySelector('.text__description');

// Work with open/close modal

const closeUploadImgModal = () => {
  uploadImgModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', escEventHandler);
};

const escStopPropagationEventHandler = (event) => {
  if (event.key === 'Escape') {
    event.stopImmediatePropagation();
  }
};

const openUploadImgModal = () => {
  const [file] = uploadFileInput.files;
  if (file) {
    uploadPreviewImg.src = URL.createObjectURL(file);
  }

  uploadImgModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', escEventHandler);

  initImgUpload();
};

unloadImgModalCross.addEventListener('click', closeUploadImgModal);

// Img settings

/* Event handlers */
function setZoom(currentZoom) {
  zoom = currentZoom;
  uploadPreviewImg.style.transform = `scale(${zoom}%)`;
  zoomIndicator.value = `${zoom}%`;
}

const zoomEventHandler = (event) => {
  zoom = event.target === plus ? zoom + ZOOM_STEP : zoom - ZOOM_STEP;
  zoom = zoom < MIN_ZOOM ? MIN_ZOOM : zoom;
  zoom = zoom > MAX_ZOOM ? MAX_ZOOM : zoom;

  setZoom(zoom);
};

const initSlider = (sliderSettings) => {
  if (sliderObject) {
    sliderObject.destroy();
  }

  if (!sliderSettings) {
    sliderContainerElement.classList.add('hidden');
    sliderValueInput.value = 'none';
    uploadPreviewImg.style.filter = 'none';
    return;
  }

  const { min, max, step, unit, effect } = sliderSettings;

  sliderContainerElement.classList.remove('hidden');

  sliderObject = noUiSlider.create(sliderElement, {
    start: [max],
    connect: true,
    range: {
      min: min,
      max: max,
    },
    step: step,
  });

  const sliderEventHandler = ([selectedValue]) => {
    sliderValueInput.value = selectedValue;
    const transform = `${effect}(${selectedValue}${unit || ''})`;
    uploadPreviewImg.style.filter = transform;
  };

  sliderObject.on('update', sliderEventHandler);

  return sliderObject;
};

/* Event Subscriptions */
minus.addEventListener('click', zoomEventHandler);
plus.addEventListener('click', zoomEventHandler);

radioInputs.forEach((radioInput) => {
  radioInput.addEventListener('change', (event) => {
    const selectedRadioInput = event.target;
    if (!selectedRadioInput.checked) {
      return;
    }

    const selectedEffect = effects[selectedRadioInput.value];
    initSlider(selectedEffect);
  });
});

hashtagInput.addEventListener('keydown', escStopPropagationEventHandler);

descriptionInput.addEventListener('keydown', escStopPropagationEventHandler);

/* Init phase */
function initImgUpload() {
  setZoom(DEFAULT_ZOOM);
  initSlider();
}

function escEventHandler(event) {
  if (event.key === 'Escape') {
    closeUploadImgModal();
  }
}

initImgUpload();
initPristine();

export { closeUploadImgModal, openUploadImgModal };
