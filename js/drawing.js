import { showBigPicture } from './big-picture.js';
import { getFilteredPictures } from './filter.js';

let photos = [];

const picturesContainer = document.querySelector('.pictures');

function createPhotoElements(pictures) {
  photos = pictures;

  // удаляем старые фото
  const oldPictures = picturesContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  const picturesFragment = document.createDocumentFragment();

  // находим шаблон
  const pictureTemplate = document.querySelector('#picture');

  pictures.forEach((photo, index) => {
    // клонируем шаблон
    const pictureElement = pictureTemplate.content.firstElementChild.cloneNode(true);
    pictureElement.dataset.index = index;

    const pictureImg = pictureElement.querySelector('.picture__img');
    const pictureLikes = pictureElement.querySelector('.picture__likes');
    const pictureComments = pictureElement.querySelector('.picture__comments');

    // заполняем элементы данными из объекта фотографии
    pictureImg.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComments.textContent = photo.comments.length;

    picturesFragment.appendChild(pictureElement);
  });

  // вставляем фрагмент со всеми заполненными элементами в контейнер
  picturesContainer.appendChild(picturesFragment);
}

function onPictureClick(evt) {
  const target = evt.target.closest('.picture');
  if (target) {
    const index = target.dataset.index;
    const photo = photos[index];
    showBigPicture(photo);
  }
}

picturesContainer.addEventListener('click', onPictureClick);

export { createPhotoElements };
