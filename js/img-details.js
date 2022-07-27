let commentsCount = 0;
let commentsList = [];

const body = document.querySelector('body');
const pictureDetailsModal = document.querySelector('.big-picture');
const loadMoreCommentsBtn = document.querySelector('.comments-loader');
const pictureDetailsCloseElement = document.querySelector(
  '.big-picture__cancel'
);

const openPictureDetails = () => {
  pictureDetailsModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', escEventHandler);
};

const closePictureDetails = () => {
  pictureDetailsModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escEventHandler);
};

const drawComments = () => {
  const comments = commentsList.slice(0, commentsCount);
  if (commentsCount === commentsList.length) {
    loadMoreCommentsBtn.classList.add('hidden');
  } else {
    loadMoreCommentsBtn.classList.remove('hidden');
  }
  const commentsContainer =
    pictureDetailsModal.querySelector('.social__comments');
  const commentTemplate = document
    .querySelector('#picture-comment')
    .content.querySelector('.social__comment');
  const commentsFragment = document.createDocumentFragment();

  commentsContainer.innerHTML = '';

  comments.forEach(({ avatar, message, name }) => {
    const commentElement = commentTemplate.cloneNode(true);
    const socialPicture = commentElement.querySelector('.social__picture');
    const socialText = commentElement.querySelector('.social__text');

    socialPicture.src = avatar;
    socialPicture.alt = name;
    socialText.textContent = message;

    commentsFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentsFragment);
};

const loadMoreComments = () => {
  commentsCount =
    commentsCount + 5 <= commentsList.length
      ? commentsCount + 5
      : commentsList.length;
  drawComments();

  const minCommentsCount = pictureDetailsModal.querySelector(
    '.min-comments-count'
  );
  minCommentsCount.textContent = commentsCount;
};

pictureDetailsCloseElement.addEventListener('click', closePictureDetails);

loadMoreCommentsBtn.addEventListener('click', loadMoreComments);

const drawPictureDetails = ({ url, description, likes, comments }) => {
  commentsCount = comments.length < 5 ? comments.length : 5;
  commentsList = comments;

  const bigPictureImg = pictureDetailsModal.querySelector(
    '.big-picture__img img'
  );
  pictureDetailsModal.querySelector('.social__picture');
  const socialCaption = pictureDetailsModal.querySelector('.social__caption');
  const likesCount = pictureDetailsModal.querySelector('.likes-count');
  const minCommentsCount = pictureDetailsModal.querySelector(
    '.min-comments-count'
  );
  const commentsCountElement =
    pictureDetailsModal.querySelector('.comments-count');

  bigPictureImg.src = url;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  minCommentsCount.textContent = commentsCount;
  commentsCountElement.textContent = comments.length;

  drawComments(comments);
};

function escEventHandler(event) {
  if (event.key === 'Escape') {
    closePictureDetails();
  }
}

export {
  openPictureDetails,
  closePictureDetails,
  drawComments,
  loadMoreComments,
  drawPictureDetails,
};
