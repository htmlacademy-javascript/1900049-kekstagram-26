import { drawKekDetails, openKekDetails } from './img-details.js';

let keksList = [];

const keksContainer = document.querySelector('.pictures');

const openKekEventHandler = (event) => {
  if (!event.target.classList.contains('picture__img')) {
    return;
  }

  const clickedId = event.path[1].id.split('picture-')[1];
  const kekToDraw = keksList.find((i) => i.id.toString() === clickedId);

  drawKekDetails(kekToDraw);
  openKekDetails();
};

keksContainer.addEventListener(
  'click',
  openKekEventHandler
);

export const drawKeksList = (keks) => {
  keksList = keks;

  keksContainer
    .querySelectorAll('.picture')
    .forEach((picture) => picture.parentNode.removeChild(picture));

  const picturesTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const similarListFragment = document.createDocumentFragment();

  keks.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    const pictureImg = pictureElement.querySelector('.picture__img');
    const pictureComments = pictureElement.querySelector('.picture__comments');
    const pictureLikes = pictureElement.querySelector('.picture__likes');

    pictureElement.id = `picture-${id}`;
    pictureImg.src = url;
    pictureImg.alt = description;
    pictureImg.title = description;

    pictureComments.textContent = comments.length;
    pictureLikes.textContent = likes;

    similarListFragment.appendChild(pictureElement);
  });

  keksContainer.appendChild(similarListFragment);
};
