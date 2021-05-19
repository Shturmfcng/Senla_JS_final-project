/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-cycle */

import { content, fetch, gallery, store } from './app';
import addAdministrationFunctions from './addAdministrationFunctions';

export default function getFilm(e) {
  const item = e.target.closest('.item');

  if (item) {
    gallery.setAttribute('hidden', '');
    const filmId = item.getAttribute('id');

    const urlFilm = `https://api.themoviedb.org/3/movie/${filmId}?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=${store.language}`;

    const fetchFilm = fetch(urlFilm);
    let genres = '';

    fetchFilm
      .then((response) => response.json())
      .then((f) => {
        f.genres.forEach((genre) => {
          genres += genre.name + ', ';
          return genres;
        });
        genres = genres.slice(0, -2) || 'No Information';

        const releaseDate = f.release_date || 'No Information';
        let backdrop;
        if (f.backdrop_path) {
          backdrop = `https://image.tmdb.org/t/p/w500${f.backdrop_path}`;
        } else {
          backdrop = '../images/content/no_image_available.svg';
        }

        const filmContent = `
            <section class="film" id="${f.id}">
              <h1 class="film__title">${f.title}</h1>
              <div class="film__image-wrapper">
                <img class="film__image" src='${backdrop}' alt='${f.title}'>
                <div>
                  <div class="film__admin">
                    <button class="pencil" type="button" tabindex="-1" hidden></button>
                    <button class="bin" type="button" tabindex="-1" hidden></button>
                  </div>
                  <div class="film__statistics">
                    <p title="Release Date">${releaseDate}</p>
                    <p title="Rating">${f.vote_average}</p>
                    <p title="Popularity">${f.popularity}</p>
                    <p title="Total Votes">${f.vote_count}</p>
                  </div>
                </div>
              </div>
              <div class="film__info">
                <p><span>Genres:</span> ${genres}</p>
                <p>${f.overview}</p>
              </div>
            </section>
            `;
        content.insertAdjacentHTML('beforeend', filmContent);

        addAdministrationFunctions();
      });
  }
}
