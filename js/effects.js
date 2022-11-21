const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview');
const slider = form.querySelector('.effect-level__slider');
const effectLevel = form.querySelector('.effect-level__value');
const effects = {
  'chrome': { filter: 'grayscale( )', options: { min: 0, max: 1, start: 0, step: 0.1 } },
  'sepia': { filter: 'sepia( )', options: { min: 0, max: 1, start: 0, step: 0.1 } },
  'marvin': { filter: 'invert( %)', options: { min: 0, max: 100, start: 0, step: 1 } },
  'phobos': { filter: 'blur( px)', options: { min: 0, max: 3, start: 0, step: 0.1 } },
  'heat': { filter: 'brightness( )', options: { min: 1, max: 3, start: 1, step: 0.1 } },
};

noUiSlider.create(slider, { range: { min: 0, max: 0 }, start: 0});

let prevEffectClass = 'effects__preview--none';

const removeFilter = () => {
  imgPreview.classList.remove(prevEffectClass);
  imgPreview.classList.add('effects__preview--none');
  imgPreview.style.filter = 'none';
  slider.classList.toggle('hidden');

  prevEffectClass = 'effects__preview--none';
};

const changeEffectClass = (newEffect) => {
  const newEffectClass = `effects__preview--${newEffect}`;

  imgPreview.classList.remove(prevEffectClass);
  imgPreview.classList.add(newEffectClass);

  prevEffectClass = newEffectClass;
};

const changeEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const newEffectName = evt.target.value;
    changeEffectClass(newEffectName);

    if (newEffectName !== 'none') {
      if (slider.classList.contains('hidden')) {
        slider.classList.remove('hidden');
      }
      const newEffectOptions = effects[newEffectName].options;
      slider.noUiSlider.updateOptions({
        range: {
          min: newEffectOptions.min,
          max: newEffectOptions.max
        },
        start: newEffectOptions.start,
        step: newEffectOptions.step
      });

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

export{changeEffect, removeFilter};
