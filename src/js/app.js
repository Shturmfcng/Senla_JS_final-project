import '../scss/app.scss';

/* eslint-disable no-console */

const fetch = require('node-fetch');

document.addEventListener('DOMContentLoaded', function () {
  const pagination = document.querySelector('.gallery__pagination');

  const sort = document.querySelector('.gallery__sort > select');

  const content = document.getElementById('content');

  let numberPage = '1';

  let sortBy = 'popularity.desc';

  const language = 'en-US';

  let url;

  goToPage();

  function goToPage() {
    const activePage = document.getElementById('activePage');
    numberPage = activePage.textContent;
    getFilms();
  }

  function switchPage(e) {
    const activePage = document.getElementById('activePage');
    const previousPage = document.getElementById('activePage').previousElementSibling;
    const nextPage = document.getElementById('activePage').nextElementSibling;
    const pages = document.querySelectorAll('.number-page');
    const page = e.target.closest('.number-page');

    if (e.target.classList.contains('number-page')) {
      activePage.removeAttribute('id');
      page.parentElement.setAttribute('id', 'activePage');
    } else if (e.target.closest('#previousPage > .switch-page') && previousPage.textContent !== '‹') {
      previousPage.setAttribute('id', 'activePage');
      document.querySelectorAll('#activePage')[1].removeAttribute('id');
    } else if (e.target.closest('#nextPage > .switch-page') && nextPage.textContent !== '›') {
      nextPage.setAttribute('id', 'activePage');
      document.querySelectorAll('#activePage')[0].removeAttribute('id');
    } else if (e.target.closest('#firstPage > .switch-page')) {
      document.querySelector('#activePage').removeAttribute('id');
      pages[0].parentElement.setAttribute('id', 'activePage');
    } else if (e.target.closest('#lastPage > .switch-page')) {
      document.querySelector('#activePage').removeAttribute('id');
      pages[pages.length - 1].parentElement.setAttribute('id', 'activePage');
    }
    goToPage();
  }

  function visiblePagination() {
    const activePage = document.getElementById('activePage');
    const pages = document.querySelectorAll('.number-page');
    if (+activePage.textContent <= 3) {
      for (let n = 5; n < +pages[pages.length - 1].textContent; n += 1) {
        pages[n].parentElement.setAttribute('hidden', '');
      }
      for (let n = 0; n < 5; n += 1) {
        pages[n].parentElement.removeAttribute('hidden');
      }
    } else if (+activePage.textContent >= +pages[pages.length - 3].textContent) {
      for (let n = 0; n < +pages[pages.length - 6].textContent; n += 1) {
        pages[n].parentElement.setAttribute('hidden', '');
      }
      for (let n = +pages[pages.length - 6].textContent; n < +pages[pages.length - 1].textContent; n += 1) {
        pages[n].parentElement.removeAttribute('hidden');
      }
    } else {
      let n = +activePage.textContent;
      for (n -= 4; n <= +activePage.textContent + 1; n += 1) {
        pages[n].parentElement.removeAttribute('hidden');
      }
      for (n = 0; n <= +activePage.textContent - 4; n += 1) {
        pages[n].parentElement.setAttribute('hidden', '');
      }
      for (n += 5; n < +pages[pages.length - 1].textContent; n += 1) {
        pages[n].parentElement.setAttribute('hidden', '');
      }
    }
  }

  function getFilms() {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=${language}&sort_by=${sortBy}&page=${numberPage}`;
    const fetchFilms = fetch(url);

    fetchFilms
      .then((response) => response.json())
      .then((films) => {
        let galleryContent = '';
        const galleryContainer = document.querySelector('.gallery__container');

        films.results.forEach((film) => {
          galleryContent += `
      <li class="gallery__item">
        <a class='item' href="#" id="${film.id}"><img src='https://image.tmdb.org/t/p/w200${film.poster_path}' alt='${film.title}'>
          <div class='tooltip'>
            <h2>${film.title}</h2>
            <p>${film.vote_average}</p>
            <p>${film.release_date}</p>
          </div>
        </a>
        <button class="bin" type="button"></button>
      </li>
      `;
        });
        console.log(films);
        galleryContainer.innerHTML = galleryContent;
      });
    visiblePagination();
  }

  function getFilm(e) {
    const item = e.target.closest('.item');

    if (item) {
      const filmId = item.getAttribute('id');
      url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=${language}`;

      const fetchFilm = fetch(url);
      let genres = '';

      fetchFilm
        .then((response) => response.json())
        .then((film) => {
          film.genres.forEach((genre) => {
            genres += genre.name + ', ';
            return genres;
          });
          genres = genres.slice(0, -2);

          const filmContent = `
            <section class="film">
              <h1 class="film__title">${film.title}</h1>
              <div class="film__image-wrapper">
                <img class="film__image" src='https://image.tmdb.org/t/p/w500${film.backdrop_path}' alt='${film.title}'>
                <div class="film__statistics">
                  <p title="Release Date">${film.release_date}</p>
                  <p title="Rating">${film.vote_average}</p>
                  <p title="Popularity">${film.popularity}</p>
                  <p title="Total Votes">${film.vote_count}</p>
                </div>
              </div>
              <div class="film__info">
                <p><span>Genres:</span> ${genres}</p>
                <p>${film.overview}</p>
              </div>
            </section>
            `;
          content.innerHTML = filmContent;
        });
    }
  }

  function sortFilms(e) {
    const pages = document.querySelectorAll('.number-page');

    if (e.target.value === 'none') {
      sortBy = 'popularity.desc';
    } else if (e.target.value === 'vote_rating_down') {
      sortBy = 'vote_average.desc';
    } else if (e.target.value === 'vote_rating_up') {
      sortBy = 'vote_average.asc';
    } else if (e.target.value === 'release_date_down') {
      sortBy = 'release_date.desc';
    } else if (e.target.value === 'release_date_up') {
      sortBy = 'release_date.asc';
    }

    numberPage = '1';
    document.querySelector('#activePage').removeAttribute('id');
    pages[0].parentElement.setAttribute('id', 'activePage');
    getFilms();
  }

  content.addEventListener('click', getFilm);
  sort.addEventListener('change', sortFilms);
  pagination.addEventListener('click', switchPage);
});
