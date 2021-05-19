/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */

import { store } from './app';
import savedData from './savedData';

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

    const film = {};
    film.title = document.getElementById('title').value;
    film.overview = document.getElementById('overview').value;
    film.poster_path = document.getElementById('poster_path').value;
    film.popularity = +document.getElementById('popularity').value;
    film.release_date = document.getElementById('release_date').value;
    film.genres = document.getElementById('genres').value;
    film.vote_average = +document.getElementById('vote_average').value;
    film.vote_count = +document.getElementById('vote_count').value;
    film.adult = document.getElementById('adult').checked;

    store.addedFilms.push(film);
    savedData();

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
