import { renderBigPicture } from './fullsizeMode.js';
import { getData } from './api.js';

const template = document.querySelector('#picture').content;
const picTemplate = template.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPicture = ({url, likes, comments, description}) => {
  const cloneOfPic = picTemplate.cloneNode(true);
  cloneOfPic.querySelector('img').src = url;
  cloneOfPic.querySelector('.picture__likes').textContent = likes;
  cloneOfPic.querySelector('.picture__comments').textContent = comments.length;
  cloneOfPic.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderBigPicture({url, likes, comments, description});
  });

  fragment.appendChild(cloneOfPic);
};

const renderPictures = (pics) => {
  pics.forEach((pic) => renderPicture(pic));
  pictures.appendChild(fragment);
};

const showError = (errorMessage) => {
  const errorTemplate = document.querySelector('#error').content.querySelector('section');
  const error = errorTemplate.cloneNode(true);

  error.querySelector('h2').textContent = errorMessage;
  document.querySelector('body').append(error);
};

getData(renderPictures, showError);
