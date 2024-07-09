import { setOnFormSubmit, hideModal } from './forms.js';
import { getData, sendData } from './server.js';
import { showAlert, showSuccessMessage, showErrorMessage, debounce } from './utils.js';
import { createPhotoElements } from './drawing.js';
import { init, getFilteredPictures } from './filter.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
    const newData = await getData(); // Получаем обновленные данные после отправки формы
    console.log('Data after form submission:', newData); // Выводим данные в консоль
    createPhotoElements(newData); // Обновляем галерею с новыми данными
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  console.log('Initial data:', data); // Выводим начальные данные в консоль
  const debounceRenderGallery = debounce(() => createPhotoElements(getFilteredPictures()));
  init(data, debounceRenderGallery);
  createPhotoElements(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}
