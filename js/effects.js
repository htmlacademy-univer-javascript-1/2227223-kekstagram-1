const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview');
const slider = form.querySelector('.effect-level__slider');
const effectLevel = form.querySelector('.effect-level__value');
const effects = {
  'chrome': { filter: 'grayscale( )', options: { range: { min: 0, max: 1, }, start: 0, step: 0.1, connect: 'lower' } },
  'sepia': { filter: 'sepia( )', options: { range: { min: 0, max: 1, }, start: 0, step: 0.1, connect: 'lower' } },
  'marvin': { filter: 'invert( %)', options: { range: { min: 0, max: 100, }, start: 0, step: 1, connect: 'lower' } },
  'phobos': { filter: 'blur( px)', options: { range: { min: 0, max: 3, }, start: 0, step: 0.1, connect: 'lower' } },
  'heat': { filter: 'brightness( )', options: { range: { min: 1, max: 3, }, start: 1, step: 0.1, connect: 'lower' } },
};

noUiSlider.create(slider, effects['chrome'].options);

let previousEffectClass = 'effects__preview--none';

function changePreviewEffectClass(newEffectName) {
  const newEffectClass = `effects__preview--${newEffectName}`;

  imgPreview.classList.remove(previousEffectClass);
  imgPreview.classList.add(newEffectClass);

  previousEffectClass = newEffectClass;
}

const onUploadOverlayEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const newEffectName = evt.target.value;
    changePreviewEffectClass(newEffectName);

    if (newEffectName !== 'none') {
      if (slider.classList.contains('hidden')) {
        slider.classList.remove('hidden');
      }
      slider.noUiSlider.updateOptions(effects[newEffectName].options);

      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        const filter = effects[newEffectName].filter.replace(' ', effectLevel.value);
        imgPreview.style.filter = filter;
      });
    }
    else {
      imgPreview.style.filter = 'none';
      slider.classList.toggle('hidden');
    }
  }
};

export{onUploadOverlayEffectChange};
