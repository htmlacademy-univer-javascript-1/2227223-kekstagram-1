const bigPicture = document.querySelector('.big-picture');
const cmtLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const cmtWidth = 35;
const cmtHeight = 35;

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
    const fragment = document.createDocumentFragment();
    const tempLi = document.createElement('li');
    const tempImg = document.createElement('img');
    const tempP = document.createElement('p');

    tempLi.classList.add('social__comment');

    tempImg.classList.add('social__picture');
    tempImg.src = comment.avatar;
    tempImg.alt = comment.name;
    tempImg.width = cmtWidth;
    tempImg.height = cmtHeight;

    tempP.classList.add('social__text');
    tempP.textContent = comment.message;

    fragment.append(tempLi);
    fragment.querySelector('li').append(tempImg);
    fragment.querySelector('li').append(tempP);

    currCmtsCount++;

    bigPicture.querySelector('.social__comments').append(fragment);
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
  const arrOfCom = document.querySelectorAll('.social__comment');
  for (let i = 0; i < arrOfCom.length; i++) {
    document.querySelector('.social__comment').remove();
  }
}

export {renderBigPicture};
