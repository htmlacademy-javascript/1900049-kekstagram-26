import { getData } from './api.js';
import { drawPictureList } from './img-list.js';
import { openUploadImgModal } from './img-upload.js';
import { filters } from './filters.js';
import { debounce } from './util.js';

let somePicture = [];
getData((posts) => {
  somePicture = posts;
  drawPictureList(posts);
  document.querySelector('.img-filters').classList.remove('hidden');
});

document
  .querySelector('.img-upload__input')
  .addEventListener('change', openUploadImgModal);

const filterForm = document.querySelector('.img-filters__form');
const filterButtons = filterForm.querySelectorAll('.img-filters__button');

const filterBtnPressEventHandler = (event) => {
  const filteredPicture = filters[event.target.id](somePicture);
  filterButtons.forEach((i) =>
    i.classList.remove('img-filters__button--active')
  );
  event.target.classList.add('img-filters__button--active');
  drawPictureList(filteredPicture);
};

filterButtons.forEach((filterButton) => {
  filterButton.addEventListener('click', debounce(filterBtnPressEventHandler));
});
