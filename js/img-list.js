import { drawPictureDetails, openPictureDetails } from './img-details.js';

let pictureList = [];

const pictureContainer = document.querySelector('.pictures');

const openPictureEventHandler = (event) => {
  if (!event.target.classList.contains('picture__img')) {
    return;
  }

  const clickedId = event.path[1].id.split('picture-')[1];
  const pictureToDraw = pictureList.find((i) => i.id.toString() === clickedId);

  drawPictureDetails(pictureToDraw);
  openPictureDetails();
};

pictureContainer.addEventListener(
  'click',
  openPictureEventHandler
);

const drawPictureList = (picture) => {
  pictureList = picture;

  pictureContainer
    .querySelectorAll('.picture')
    .forEach((currentPicture) => currentPicture.parentNode.removeChild(currentPicture));

  const picturesTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const similarListFragment = document.createDocumentFragment();

  picture.forEach(({ id, url, description, likes, comments }) => {
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

  pictureContainer.appendChild(similarListFragment);
};

export { drawPictureList };
