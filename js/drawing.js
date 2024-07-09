import { showBigPicture } from './big-picture.js';
import { getFilteredPictures } from './filter.js';

let photos = [];

const picturesContainer = document.querySelector('.pictures');

const createPhotoElements = (pictures) => {
  console.log('Photos to render:', pictures); // Логируем данные для отладки

  // Удаляем старые фото
  const oldPictures = picturesContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  const picturesFragment = document.createDocumentFragment();

  // Находим шаблон
  const pictureTemplate = document.querySelector('#picture');
  if (!pictureTemplate) {
    console.error('Picture template not found');
    return;
  }

  pictures.forEach((photo, index) => {
    console.log('Rendering photo:', photo); // Логируем каждое фото для отладки
    // Клонируем шаблон
    const pictureElement = pictureTemplate.content.firstElementChild.cloneNode(true);
    pictureElement.dataset.index = index;

    const pictureImg = pictureElement.querySelector('.picture__img');
    const pictureLikes = pictureElement.querySelector('.picture__likes');
    const pictureComments = pictureElement.querySelector('.picture__comments');

    // Заполняем элементы данными из объекта фотографии
    pictureImg.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComments.textContent = photo.comments.length;

    picturesFragment.appendChild(pictureElement);
  });

  // Вставляем фрагмент со всеми заполненными элементами в контейнер
  picturesContainer.appendChild(picturesFragment);
};



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
