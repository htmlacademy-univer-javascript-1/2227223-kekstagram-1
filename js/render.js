import { renderBigPicture } from './fullsizeMode.js';
import { getData } from './api.js';
import { getRandomElements, debounce } from './util.js';

const template = document.querySelector('#picture').content;
const picTemplate = template.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const filtersButtons = document.querySelector('.img-filters__form');
const defFilterButton = document.querySelector('#filter-default');
const randFilterButton = document.querySelector('#filter-random');
const discFilterButton = document.querySelector('#filter-discussed');

let newPics, currPics = [];

const renderPicture = ({url, likes, comments, description}) => {
  const newPic = picTemplate.cloneNode(true);

  newPic.querySelector('img').src = url;
  newPic.querySelector('.picture__likes').textContent = likes;
  newPic.querySelector('.picture__comments').textContent = comments.length;
  newPic.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderBigPicture({url, likes, comments, description});
  });

  fragment.appendChild(newPic);
  currPics.push(newPic);
};

const renderPictures = () => {
  removePhotos();
  newPics.forEach((pic) => renderPicture(pic));
  pictures.appendChild(fragment);
};

const addDefFilterClass = () => {
  defFilterButton.classList.add('img-filters__button--active');
  randFilterButton.classList.remove('img-filters__button--active');
  discFilterButton.classList.remove('img-filters__button--active');
};

const addRandFilterClass = () => {
  defFilterButton.classList.remove('img-filters__button--active');
  randFilterButton.classList.add('img-filters__button--active');
  discFilterButton.classList.remove('img-filters__button--active');
};

const addDiscFilterClass = () => {
  defFilterButton.classList.remove('img-filters__button--active');
  randFilterButton.classList.remove('img-filters__button--active');
  discFilterButton.classList.add('img-filters__button--active');
};

const changeFilter = (photos, db) => {
  filtersButtons.addEventListener('click', (evt) => {
    newPics = [...photos];
    switch (evt.target.id) {
      case 'filter-default':
        addDefFilterClass();
        break;
      case 'filter-random':
        addRandFilterClass();
        newPics = getRandomElements(newPics, 10);
        break;
      case 'filter-discussed':
        addDiscFilterClass();
        newPics.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    db();
  });
};

const firstRenderPictures = (photos) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  newPics = [...photos];

  renderPictures();
  changeFilter(photos, debounce(() => renderPictures(), 500));
};

function removePhotos() {
  currPics.forEach((pic) => pictures.removeChild(pic));
  currPics = [];
}

const showError = (errorMessage) => {
  const errorTemplate = document.querySelector('#error').content.querySelector('section');
  const error = errorTemplate.cloneNode(true);

  error.querySelector('h2').textContent = errorMessage;
  document.querySelector('body').append(error);
};

getData(firstRenderPictures, showError);
