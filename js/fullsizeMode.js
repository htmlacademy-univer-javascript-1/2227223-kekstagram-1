const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const cmtLoader = bigPicture.querySelector('.comments-loader');
const cmtTemplate = bigPicture.querySelector('.social__comment');

let allCmts = 0;
let allCmtsCount = 0;
let currCmtsCount = 0;

const closeOption = () => {
  bigPicture.classList.add('hidden');
  cmtLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  currCmtsCount = 0;
};

const escClose = (keyEvent) => {
  if (keyEvent.keyCode === 27) {
    closeOption();
    document.removeEventListener('keydown', escClose);
  }
};

const buttonClose = () => {
  document.addEventListener('keydown', escClose);
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeOption();
    document.removeEventListener('keydown', escClose);
  });
};

const renderComments = (comments) => {
  comments.forEach((comment) => {
    const newCmt = cmtTemplate.cloneNode(true);

    const newCmtAvatar = newCmt.querySelector('img');
    newCmtAvatar.src = comment.avatar;
    newCmtAvatar.alt = comment.name;

    newCmt.querySelector('p').textContent = comment.message;

    bigPicture.querySelector('.social__comments').append(newCmt);

    currCmtsCount++;
  });
  document.querySelector('.current-comments-count').textContent = currCmtsCount;
  if (currCmtsCount === allCmtsCount) {
    cmtLoader.classList.add('hidden');
  }
};

const renderFiveCmts = () => {
  renderComments(allCmts.slice(currCmtsCount, currCmtsCount + 5));
};

const loadFiveCmts = (evt) => {
  evt.preventDefault();
  renderFiveCmts();
};

const createComments = () => {
  deleteOldCmts();

  renderFiveCmts();
  cmtLoader.addEventListener('click', loadFiveCmts);
};

const renderBigPicture = ({url, likes, comments, description}) => {
  allCmts = comments;
  allCmtsCount = comments.length;

  document.querySelector('.big-picture__img').querySelector('img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = allCmtsCount;
  document.querySelector('.social__caption').textContent = description;

  createComments();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  buttonClose();
};

function deleteOldCmts() {
  const oldCmts = document.querySelectorAll('.social__comment');
  oldCmts.forEach((cmt) => cmt.remove());
}

export {renderBigPicture};
