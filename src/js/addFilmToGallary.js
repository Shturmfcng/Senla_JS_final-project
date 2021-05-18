/* eslint-disable linebreak-style */

export default function addFilmToGallary(e) {
  const message = document.querySelector('.message');
  const messageSuccess = document.querySelector('.message > span:first-child');
  const addFilmForm = document.getElementById('addFilmForm');
  const addFilmFormDiv = document.querySelectorAll('#addFilmForm > div:not(.message)');
  const btnAdd = document.getElementById('btnAdd');

  if (e) {
    e.preventDefault();
    message.classList.add('message--visible');
    messageSuccess.removeAttribute('hidden');
    for (const item of addFilmFormDiv) {
      item.setAttribute('hidden', '');
    }
    btnAdd.setAttribute('disabled', '');
    setTimeout(() => {
      for (const item of addFilmFormDiv) {
        item.removeAttribute('hidden', '');
      }
      addFilmForm.reset();
      messageSuccess.setAttribute('hidden', '');
      message.classList.remove('message--visible');
    }, 2000);
  }
}
