import { setOnFormSubmit, hideModal } from './forms.js';
import { getData, sendData } from './server.js';
import { showAlert, showSuccessMessage, showErrorMessage, debounce } from './utils.js';
import { createPhotoElements } from './drawing.js';
import { init, getFilteredPictures } from './filter.js';

setOnFormSubmit(async (data) => {
  try {
    const newData = await sendData(data); // Получаем обновленные данные после отправки формы
    console.log('Data after form submission:', newData); // Выводим данные в консоль для проверки
    hideModal();
    showSuccessMessage();
    createPhotoElements(newData); // Обновляем галерею с новыми данными
  } catch (error) {
    console.error('Error submitting data:', error);
    showErrorMessage();
  }
});

try {
  const data = await getData();
  console.log('Initial data:', data); // Выводим начальные данные в консоль для проверки
  const debounceRenderGallery = debounce(() => createPhotoElements(getFilteredPictures()));
  init(data, debounceRenderGallery);
  createPhotoElements(getFilteredPictures());
} catch (err) {
  console.error('Error fetching initial data:', err);
  showAlert(err.message);
}


