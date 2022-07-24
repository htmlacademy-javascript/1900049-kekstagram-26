let commentsCount = 0;
let commentsList = [];

const body = document.querySelector('body');
const kekDetailsModal = document.querySelector('.big-picture');
const loadMoreCommentsBtn = document.querySelector('.comments-loader');
const kekDetailsCloseElement = document.querySelector('.big-picture__cancel');

export const openKekDetails = () => {
  kekDetailsModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', escEventHandler);
};

export const closeKekDetails = () => {
  kekDetailsModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escEventHandler);
};

export const drawComments = () => {
  const comments = commentsList.slice(0, commentsCount);
  if (commentsCount === commentsList.length) {
    loadMoreCommentsBtn.classList.add('hidden');
  }
  else {loadMoreCommentsBtn.classList.remove('hidden');
  }
  const commentsContainer = kekDetailsModal.querySelector('.social__comments');
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

export const loadMoreComments = () => {
  commentsCount =
    commentsCount + 5 <= commentsList.length
      ? commentsCount + 5
      : commentsList.length;
  drawComments();

  const minCommentsCount = kekDetailsModal.querySelector('.min-comments-count');
  minCommentsCount.textContent = commentsCount;
};

kekDetailsCloseElement.addEventListener(
  'click',
  closeKekDetails
);

loadMoreCommentsBtn.addEventListener(
  'click',
  loadMoreComments
);

export const drawKekDetails = ({ url, description, likes, comments }) => {
  commentsCount = comments.length < 5 ? comments.length : 5;
  commentsList = comments;

  const bigPictureImg = kekDetailsModal.querySelector('.big-picture__img img');
  kekDetailsModal.querySelector('.social__picture');
  const socialCaption = kekDetailsModal.querySelector('.social__caption');
  const likesCount = kekDetailsModal.querySelector('.likes-count');
  const minCommentsCount = kekDetailsModal.querySelector('.min-comments-count');
  const commentsCountElement = kekDetailsModal.querySelector('.comments-count');

  bigPictureImg.src = url;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  minCommentsCount.textContent = commentsCount;
  commentsCountElement.textContent = comments.length;

  drawComments(comments);
};

function escEventHandler (event) {
  if (event.key === 'Escape') {
    closeKekDetails();
  }
}
