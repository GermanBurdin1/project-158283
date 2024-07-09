import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const NUMBER_SYMBOLS_COMMENTFIELD = 140;
const COMMENT_ERROR_TEXT = `Комментарий не может быть длиннее ${NUMBER_SYMBOLS_COMMENTFIELD} символов`;

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('button[type="submit"]');


const submitButtonText = {
  IDLE: 'Отправить',
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown',onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if(evt.key === 'Escape' && !isTextFieldFocused() && ! document.querySelector('.error')) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};


const onFileInputChange = () => {
  const file = fileField.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const img = document.createElement('img');
    img.src = reader.result;
    img.alt = 'preview';
    const previewContainer = document.querySelector('.img-upload__preview');
    previewContainer.innerHTML = '';
    previewContainer.appendChild(img);
    resetScale();
    showModal();
  });

  if (file) {
    reader.readAsDataURL(file);
  }
};


const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set (lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  HASHTAG_ERROR_TEXT,
);

//функция для валидации длины комментария
const validateCommentCount = (value) => value.trim().length <= 140;

//валидацтор длины комментария
pristine.addValidator(
  commentField,
  validateCommentCount,
  COMMENT_ERROR_TEXT,
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export { setOnFormSubmit, hideModal };
