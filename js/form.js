const body = document.querySelector('body');
const initialImgUpload = document.querySelector('.img-upload__start');
const editImg = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const imgDescr = document.querySelector('.text__description');
const hashtags = document.querySelector('.text__hashtags');

const closeOption = () => {
  editImg.classList.add('hidden');
  body.classList.remove('modal-open');
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
  body.classList.add('modal-open');

  buttonClose();
};
