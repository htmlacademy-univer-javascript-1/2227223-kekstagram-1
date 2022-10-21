import {generatePosts} from './util';

const template = document.querySelector('#picture').content;
const newTemplate = template.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPicture = ({url, likes, comments}) => {
  const cloneOfPic = newTemplate.cloneNode(true);
  cloneOfPic.querySelector('img').src = url;
  cloneOfPic.querySelector('.picture__likes').textContent = likes;
  cloneOfPic.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(cloneOfPic);
};

const renderPictures = (pics) => {
  for (let i = 0; i < pics.length; i++) {
    renderPicture(pics[i]);
  }
  pictures.appendChild(fragment);
};

renderPictures(generatePosts(25));
