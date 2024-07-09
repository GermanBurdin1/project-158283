const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      console.log(`Response from ${route}:`, data);
      return data;
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) =>
  fetch(`${BASE_URL}${Route.SEND_DATA}`, { method: Method.POST, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorText.SEND_DATA);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Data returned after POST:', data);
      return getData(); // После отправки данных, заново получаем обновленные данные
    })
    .then((data) => {
      return data; // Убедимся, что возвращаем обновленные данные
    });

export { getData, sendData };
