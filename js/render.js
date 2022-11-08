import {generatePosts} from './util.js';
import {renderBigPicture} from './fullsizeMode.js';

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
  for (let i = 0; i < pics.length; i++) {
    renderPicture(pics[i]);
  }
  pictures.appendChild(fragment);
};

renderPictures(generatePosts(25));
