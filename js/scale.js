import { MIN_SCALE, MAX_SCALE, SCALE_STEP } from './data.js';

const imgPreview = document.querySelector('.img-upload__preview');
const scaleField = document.querySelector('.img-upload__scale');
const scaleValue = scaleField.querySelector('.scale__control--value');
const scaleSub = scaleField.querySelector('.scale__control--smaller');
const scaleAdd = scaleField.querySelector('.scale__control--bigger');

let currScale = parseInt(scaleValue.value.slice(0, -1), 10);

const scalePlusButton = () => {
  currScale = currScale + SCALE_STEP > MAX_SCALE ? MAX_SCALE : currScale + SCALE_STEP;

  scaleValue.value = `${currScale}%`;
  imgPreview.style = `transform: scale(${currScale / 100})`;
};

const scaleMinusButton = () => {
  currScale = currScale - SCALE_STEP < MIN_SCALE ? MIN_SCALE : currScale - SCALE_STEP;

  scaleValue.value = `${currScale}%`;
  imgPreview.style = `transform: scale(${currScale / 100})`;
};

scaleAdd.addEventListener('click', scalePlusButton);
scaleSub.addEventListener('click', scaleMinusButton);

export {scaleValue};
