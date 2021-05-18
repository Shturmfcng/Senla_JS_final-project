/* eslint-disable linebreak-style */
import { fetch, store } from './app';

export default function getGenres() {
  const urlGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=${store.language}`;

  const fetchGenres = fetch(urlGenres);

  fetchGenres
    .then((response) => response.json())
    .then((result) => {
      let genre = '';
      const genres = document.getElementById('filmGenres');

      result.genres.forEach((g) => {
        genre += `
          <option id="${g.id}" name="${g.name}">
            ${g.name}
          </option>
          `;
      });

      genres.innerHTML = genre;
    });
}
