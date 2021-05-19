/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import { fetch, store } from './app';
import addAdministrationFunctions from './addAdministrationFunctions';
import visiblePagination from './visiblePagination';

export default function getFilms() {
  const urlFilms = `https://api.themoviedb.org/3/discover/movie?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=${store.language}&sort_by=${store.sortBy}&page=${store.numberPage}&vote_count.gte=10`;
  const fetchFilms = fetch(urlFilms);

  fetchFilms
    .then((response) => response.json())
    .then((films) => {
      let galleryContent = '';
      const galleryContainer = document.querySelector('.gallery__container');

      films.results.forEach((f) => {
        if (!store.deletedFilmsId.includes(f.id.toString())) {
          const releaseDate = f.release_date || 'No Information';
          let poster;
          if (f.poster_path) {
            poster = `https://image.tmdb.org/t/p/w200${f.poster_path}`;
          } else {
            poster = '../images/content/no_image_available.svg';
          }

          galleryContent += `
            <li class="gallery__item">
              <a class="item" href="#" id="${f.id}"><img src="${poster}" alt="${f.title}">
                <div class='tooltip'>
                  <h2>${f.title}</h2>
                  <p>${f.vote_average}</p>
                  <p>${releaseDate}</p>
                </div>
              </a>
              <div class="item--admin">
                <button class="bin" type="button" tabindex="-1" hidden></button>
              </div>
            </li>
            `;
        }
      });

      galleryContainer.innerHTML = galleryContent;
      addAdministrationFunctions();
    });
  visiblePagination();
}
