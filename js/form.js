import { scaleValue } from './scale.js';
import { onUploadOverlayEffectChange } from './effects.js';

const body = document.querySelector('body');
const initialImgUpload = document.querySelector('.img-upload__start');
const form = document.querySelector('.img-upload__form');
const editImg = form.querySelector('.img-upload__overlay');
const imgPreview = editImg.querySelector('.img-upload__preview');
const uploadFile = form.querySelector('#upload-file');
const imgDescr = form.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');
const slider = form.querySelector('.effect-level__slider');

const closeOption = () => {
  body.classList.remove('modal-open');
  editImg.classList.add('hidden');

  form.removeEventListener('change', onUploadOverlayEffectChange);

  uploadFile.value = '';
  imgDescr.value = '';
  hashtags.value = '';
};

const escClose = (keyEvent) => {
  if (keyEvent.keyCode === 27) {
    closeOption();
    document.removeEventListener('keydown', escClose);
  }
};

const buttonClose = () => {
  document.addEventListener('keydown', escClose);
  editImg.querySelector('.img-upload__cancel').addEventListener('click', () => {
    closeOption();
    document.removeEventListener('keydown', escClose);
  });
};

initialImgUpload.onchange = () => {
  editImg.classList.remove('hidden');
  slider.classList.add('hidden');
  body.classList.add('modal-open');

  scaleValue.value = '100%';
  imgPreview.style = `transform: scale(${scaleValue})`;

  form.addEventListener('change', onUploadOverlayEffectChange);

  buttonClose();
};
