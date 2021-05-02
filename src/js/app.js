import '../scss/app.scss';

/* eslint-disable no-console */

const fetch = require('node-fetch');

const pagination = document.querySelector('.gallery__pagination');

const sort = document.querySelector('.gallery__sort > select');

// eslint-disable-next-line operator-linebreak
let url =
  'https://api.themoviedb.org/3/discover/movie?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';

function switchPage(e) {
  const activePage = document.getElementById('activePage');
  const previousPage = document.getElementById('activePage').previousElementSibling;
  const nextPage = document.getElementById('activePage').nextElementSibling;
  const pages = document.querySelectorAll('.page');
  const page = e.target.closest('.page');

  if (e.target.classList.contains('page')) {
    activePage.removeAttribute('id');
    page.parentElement.setAttribute('id', 'activePage');
    goToPage();
  } else if (e.target.closest('#previousPage > .switch-page') && previousPage.textContent !== '‹') {
    previousPage.setAttribute('id', 'activePage');
    document.querySelectorAll('#activePage')[1].removeAttribute('id');
    goToPage();
  } else if (e.target.closest('#nextPage > .switch-page') && nextPage.textContent !== '›') {
    nextPage.setAttribute('id', 'activePage');
    document.querySelectorAll('#activePage')[0].removeAttribute('id');
    goToPage();
  } else if (e.target.closest('#firstPage > .switch-page')) {
    document.querySelector('#activePage').removeAttribute('id');
    pages[0].parentElement.setAttribute('id', 'activePage');
    goToPage();
  } else if (e.target.closest('#lastPage > .switch-page')) {
    document.querySelector('#activePage').removeAttribute('id');
    pages[pages.length - 1].parentElement.setAttribute('id', 'activePage');
    goToPage();
  }
}

function visiblePagination() {
  const activePage = document.getElementById('activePage');
  const pages = document.querySelectorAll('.page');
  if (+activePage.textContent <= 3) {
    for (let n = 5; n < +pages[pages.length - 1].textContent; n += 1) {
      pages[n].parentElement.setAttribute('hidden', 'true');
    }
    for (let n = 0; n < 5; n += 1) {
      pages[n].parentElement.removeAttribute('hidden');
    }
  } else if (+activePage.textContent >= +pages[pages.length - 3].textContent) {
    for (let n = 0; n < +pages[pages.length - 6].textContent; n += 1) {
      pages[n].parentElement.setAttribute('hidden', 'true');
    }
    for (
      let n = +pages[pages.length - 6].textContent;
      n < +pages[pages.length - 1].textContent;
      n += 1
    ) {
      pages[n].parentElement.removeAttribute('hidden');
    }
  } else {
    let n = +activePage.textContent;
    for (n -= 4; n <= +activePage.textContent + 1; n += 1) {
      pages[n].parentElement.removeAttribute('hidden');
    }
    for (n = 0; n <= +activePage.textContent - 4; n += 1) {
      pages[n].parentElement.setAttribute('hidden', 'true');
    }
    for (n += 5; n < +pages[pages.length - 1].textContent; n += 1) {
      pages[n].parentElement.setAttribute('hidden', 'true');
    }
  }
}

function goToPage() {
  const activePage = document.getElementById('activePage');
  url += '&page=' + activePage.textContent;
  getFilms();
  visiblePagination();
}

function getFilms() {
  const fetchPromise = fetch(url);

  fetchPromise
    .then((response) => response.json())
    .then((films) => {
      let galleryContent = '';
      const gallery = document.querySelector('.gallery__container');

      films.results.forEach((film) => {
        galleryContent += `<li class="gallery__item" tabindex="0">
      <div class='tooltip'>
      <span>${film.title}</span>
      <span>${film.vote_average}</span>
      <span>${film.release_date}</span>
      </div>
      <img src='https://image.tmdb.org/t/p/w200${film.poster_path}' alt='${film.title}'>
      </li>`;
      });
      console.log(films);
      gallery.innerHTML = galleryContent;
    });
}

function sortFilms(e) {
  if (e.target.value === 'none') {
    // eslint-disable-next-line operator-linebreak
    url =
      'https://api.themoviedb.org/3/discover/movie?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
    getFilms();
  } else if (e.target.value === 'vote_rating_down') {
    url += '&sort_by=vote_average.desc';
    getFilms();
  } else if (e.target.value === 'vote_rating_up') {
    url += '&sort_by=vote_average.asc';
    getFilms();
  } else if (e.target.value === 'release_date_down') {
    url += '&sort_by=release_date.desc';
    getFilms();
  } else if (e.target.value === 'release_date_up') {
    url += '&sort_by=release_date.asc';
    getFilms();
  }
}

document.addEventListener('DOMContentLoaded', goToPage);
pagination.addEventListener('click', switchPage);
sort.addEventListener('change', sortFilms);
