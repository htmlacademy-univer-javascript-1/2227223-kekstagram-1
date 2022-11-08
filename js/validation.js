const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const imgDescr = document.querySelector('.text__description');

const hashtagTmpl = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const onFocusIgnoreEsc = (keyEvent) => {
  if (keyEvent.keyCode === 27) {
    keyEvent.stopPropagation();
  }
};

const hashtagsHandler = (value) => {
  value = value.toLowerCase().trim();
  if (!value) {
    return true;
  }

  const hashtags = value.split(/\s+/);
  const uniqHashtags = [...new Set(hashtags)];

  for (const hashtag of uniqHashtags) {
    if (!hashtagTmpl.test(hashtag)) {
      return false;
    }
  }

  return hashtags.length <= MAX_HASHTAGS_COUNT && hashtags.length === uniqHashtags.length;
};

const commentHandler = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(inputHashtag, hashtagsHandler, 'Неккоректный ввод хэш-тегов');

pristine.addValidator(imgDescr, commentHandler, 'Длина комментария не может составлять больше 140 символов');

inputHashtag.onkeydown = onFocusIgnoreEsc;
imgDescr.onkeydown = onFocusIgnoreEsc;

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
