const bigPicture = document.querySelector('.big-picture');
const socCmtCount = document.querySelector('.social__comment-count');
const cmtLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const cmtWidth = 35;
const cmtHeight = 35;

const closeOption = () => {
  bigPicture.classList.add('hidden');
  socCmtCount.classList.remove('hidden');
  cmtLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  bigPicture.querySelector('.social__comments').replaceChildren();
};

const escClose = (keyEvent) => {
  if (keyEvent.keyCode === 27) {
    closeOption();
    document.removeEventListener('keydown', escClose);
  }
};

const buttonClose = () => {
  document.addEventListener('keydown', escClose);
  document.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeOption();
    document.removeEventListener('keydown', escClose);
  });
};

const renderComment = ({avatar, message, name}) => {
  const fragment = document.createDocumentFragment();
  const tempLi = document.createElement('li');
  const tempImg = document.createElement('img');
  const tempP = document.createElement('p');

  tempLi.classList.add('social__comment');

  tempImg.classList.add('social__picture');
  tempImg.src = avatar;
  tempImg.alt = name;
  tempImg.width = cmtWidth;
  tempImg.height = cmtHeight;

  tempP.classList.add('social__text');
  tempP.textContent = message;

  fragment.append(tempLi);
  fragment.querySelector('li').append(tempImg);
  fragment.querySelector('li').append(tempP);

  bigPicture.querySelector('.social__comments').append(fragment);
};

const renderComments = (comments) => {
  comments.forEach((comment) => {
    renderComment(comment);
  });
};

const renderBigPicture = ({url, likes, comments, description}) => {
  document.querySelector('.big-picture__img').querySelector('img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  document.querySelector('.social__caption').textContent = description;

  renderComments(comments);

  bigPicture.classList.remove('hidden');
  socCmtCount.classList.add('hidden');
  cmtLoader.classList.add('hidden');
  body.classList.add('modal-open');

  buttonClose();
};

export {renderBigPicture};
