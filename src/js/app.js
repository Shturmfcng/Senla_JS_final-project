/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
import '../scss/app.scss';
import users from '../dummy_data/users.json';

const fetch = require('node-fetch');

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const sort = document.querySelector('.gallery__sort > select');
  const pagination = document.querySelector('.gallery__pagination');
  const content = document.getElementById('content');
  const gallery = document.querySelector('.gallery');
  const authorizedUser = document.getElementById('authorizedUser');
  const btnSignInUp = document.getElementById('btnSignInUp');
  let store = {
    users,
    authorizedUser: {},
    numberPage: '1',
    sortBy: 'popularity.desc',
    language: 'en-US',
  };

  loadData();
  checkAuthorizedUser();
  goToPage();
  console.log(store);

  function checkAuthorizedUser() {
    if (!store.authorizedUser.name === false) {
      authorizedUser.textContent = store.authorizedUser.name;
      btnSignInUp.textContent = 'Log Out';
    } else {
      btnSignInUp.textContent = 'Sign In / Sign Up';
    }
  }

  function savedData() {
    localStorage.setItem('savedData', JSON.stringify(store));
  }

  function loadData() {
    const data = localStorage.getItem('savedData');
    if (data) {
      store = JSON.parse(data);
    }
  }

  function goToPage() {
    const activePage = document.getElementById('activePage');
    store.numberPage = activePage.textContent;
    getFilms();
  }

  function applicationControl(e) {
    const film = document.querySelector('.film');
    const signInUp = document.querySelector('.sign_in_up');
    const registration = document.querySelector('.registration');
    const addFilm = document.querySelector('.add_film');

    if (e.target.closest('.btn-return_homepage')) {
      if (document.querySelectorAll('section').length === 1) {
        sort.selectedIndex = 0;
        store.sortBy = 'popularity.desc';
        goToHomepage();
      }
      getFilms();
      gallery.removeAttribute('hidden');

      if (film) {
        film.remove();
      } else if (signInUp) {
        signInUp.remove();
      } else if (registration) {
        registration.remove();
      } else if (addFilm) {
        addFilm.remove();
      }
    } else if (e.target.closest('#btnSignInUp')) {
      if (!authorizedUser.textContent === false) {
        if (store.authorizedUser.isAdmin && addFilm) {
          addFilm.remove();
          sort.selectedIndex = 0;
          store.sortBy = 'popularity.desc';
          goToHomepage();
          getFilms();
          gallery.removeAttribute('hidden');
        }
        authorizedUser.textContent = '';
        btnSignInUp.textContent = 'Sign In / Sign Up';
        store.authorizedUser = {};
        savedData();
        addAdministrationFunctions();
      } else if (!signInUp) {
        gallery.setAttribute('hidden', '');
        if (film) {
          film.remove();
        } else if (registration) {
          registration.remove();
        } else if (addFilm) {
          addFilm.remove();
        }
        goToSignInUp();
      }
    }
  }

  function goToHomepage() {
    const pages = document.querySelectorAll('.number-page');
    store.numberPage = '1';
    document.querySelector('#activePage').removeAttribute('id');
    pages[0].parentElement.setAttribute('id', 'activePage');
  }

  function goToSignInUp() {
    const pageContent = `
      <section class="sign_in_up">
        <div class="sign_in_up__content">
          <h1 class="sign_in_up__content__title">Sign In</h1>
          <form id="signInForm" class="sign_in_up__content__form">
            <div>
              <input type="email" id="email" name="email" placeholder="Email" required />
              <label for="email">Email</label>
              <p class="requirements">The email address must contain the "@" symbol.</p>
            </div>
            <div>
              <input type="password" id="password" name="password" minlength="6"
              placeholder="Password" required />
              <label for="password">Password</label>
              <p class="requirements">The password must be at least 6 characters long.</p>
            </div>
            <div class="message">
              <span hidden>Authorization was successful!</span>
              <span hidden>Email or Password entered incorrectly!</span>
            </div>
          </form>
          <div class="sign_in_up__content__buttons">
            <button form="signInForm" id="btnSignIn" class="btn btn--primary" aria-label="Sign In" disabled>Sign In</button>
            <a id="btnRegistration" class="btn btn--primary" href="#" role="button" aria-label="Registration">Registration</a>
          </div>
        </div>
      </section>
    `;
    content.insertAdjacentHTML('beforeend', pageContent);

    const signInUp = document.querySelector('.sign_in_up');
    signInUp.addEventListener('input', checkValidity);
    signInUp.addEventListener('submit', signIn);
    signInUp.addEventListener('click', goToRegistration);
  }

  function signIn(e) {
    const signInUp = document.querySelector('.sign_in_up');
    const message = document.querySelector('.message');
    const messageSuccess = document.querySelector('.message > span:first-child');
    const messageError = document.querySelector('.message > span:last-child');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const btnSignIn = document.getElementById('btnSignIn');

    if (e) {
      for (const user of store.users) {
        if (user.email.toLowerCase() === email.value.toLowerCase()) {
          if (user.password === password.value) {
            e.preventDefault();
            store.authorizedUser = user;
            checkAuthorizedUser();
            message.classList.add('message--visible');
            messageSuccess.removeAttribute('hidden');
            savedData();
            setTimeout(() => {
              signInUp.remove();
              gallery.removeAttribute('hidden');
              addAdministrationFunctions();
            }, 2000);
          } else {
            e.preventDefault();
          }
        } else {
          e.preventDefault();
        }
      }
      if (!authorizedUser.textContent) {
        message.classList.add('message--visible');
        messageError.removeAttribute('hidden');
        setTimeout(() => {
          message.classList.remove('message--visible');
          email.value = '';
          password.value = '';
          messageError.setAttribute('hidden', '');
          btnSignIn.setAttribute('disabled', '');
        }, 2000);
      }
    }
  }

  function addAdministrationFunctions() {
    const btnAddFilm = document.querySelector('.btn-add_film');
    const bins = document.querySelectorAll('.bin');
    const pencil = document.querySelector('.pencil');

    if (store.authorizedUser.isAdmin) {
      if (btnAddFilm) {
        btnAddFilm.removeAttribute('hidden');
      }
      if (bins) {
        for (const bin of bins) {
          bin.removeAttribute('hidden');
        }
      }
      if (pencil) {
        pencil.removeAttribute('hidden');
      }
    } else {
      if (btnAddFilm) {
        btnAddFilm.setAttribute('hidden', '');
      }
      if (bins) {
        for (const bin of bins) {
          bin.setAttribute('hidden', '');
        }
      }
      if (pencil) {
        pencil.setAttribute('hidden', '');
      }
    }
  }

  function goToRegistration(e) {
    const btnRegistration = e.target.closest('#btnRegistration');
    const signInUp = document.querySelector('.sign_in_up');

    if (btnRegistration) {
      signInUp.remove();
      const pageContent = `
      <section class="registration">
        <div class="registration__content">
          <h1 class="registration__content__title">Registration</h1>
          <form id="registrationForm" class="registration__content__form">
            <div>
              <input type="text" id="userName" name="userName" minlength="6" placeholder="Name" required />
              <label for="userName">Name</label>
              <p class="requirements">The name must be at least 6 characters long.</p>
            </div>
            <div>
              <input type="text" id="userSurname" name="userSurname" minlength="6" placeholder="Surname" required />
              <label for="userSurname">Surname</label>
              <p class="requirements">The surname must be at least 6 characters long.</p>
            </div>
            <div>
              <input type="password" id="password" name="password" minlength="6"
              placeholder="Password" required />
              <label for="password">Password</label>
              <p class="requirements">The password must be at least 6 characters long.</p>
            </div>
            <div>
              <input type="password" id="confirmPassword" name="confirm-password" minlength="6"
              placeholder="Confirm Password" required />
              <label for="confirmPassword">Confirm Password</label>
              <p class="requirements">You entered two different passwords. Please try again.</p>
            </div>
            <div>
              <input type="email" id="email" name="email" placeholder="Email" required />
              <label for="email">Email</label>
              <p class="requirements">The email address must contain the "@" symbol.</p>
            </div>
            <div class="message">
              <span hidden>Registration completed successfully!</span>
              <span hidden>A user with this Email already registered!</span>
            </div>
          </form>
          <div class="registration__content__buttons">
            <button form="registrationForm" id="btnSignUp" class="btn btn--primary" aria-label="Sign Up" disabled>
            Sign Up</button>
            <button form="registrationForm" id="btnClear" class="btn btn--secondary" type="reset" aria-label="Clear">
            Clear</button>
          </div>
        </div>
      </section>
      `;
      content.insertAdjacentHTML('beforeend', pageContent);

      const registration = document.querySelector('.registration');
      registration.addEventListener('input', checkValidity);
      registration.addEventListener('input', checkPasswordsMatch);
      registration.addEventListener('submit', signUp);
      registration.addEventListener('click', clearForm);
    }
  }

  function signUp(e) {
    const message = document.querySelector('.message');
    const messageSuccess = document.querySelector('.message > span:first-child');
    const messageError = document.querySelector('.message > span:last-child');
    const name = document.getElementById('userName');
    const surname = document.getElementById('userSurname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const registration = document.querySelector('.registration');
    const registrationForm = document.getElementById('registrationForm');
    const btnSignUp = document.getElementById('btnSignUp');

    if (e && !store.users.find((user) => user.email.toLowerCase() === email.value.toLowerCase())) {
      e.preventDefault();
      const user = {
        name: name.value,
        surname: surname.value,
        password: password.value,
        email: email.value,
        isAdmin: false,
      };
      authorizedUser.textContent = user.name;
      btnSignInUp.textContent = 'Log Out';
      store.authorizedUser = user;
      store.users.push(user);
      message.classList.add('message--visible');
      messageSuccess.removeAttribute('hidden');
      savedData();
      setTimeout(() => {
        registration.remove();
        gallery.removeAttribute('hidden');
      }, 2000);
    } else {
      e.preventDefault();
      message.classList.add('message--visible');
      messageError.removeAttribute('hidden');
      setTimeout(() => {
        message.classList.remove('message--visible');
        registrationForm.reset();
        messageError.setAttribute('hidden', '');
        btnSignUp.setAttribute('disabled', '');
        confirmPassword.classList.remove('valid');
        confirmPassword.classList.remove('invalid');
      }, 2000);
    }
  }

  function clearForm(e) {
    const btnClear = e.target.closest('#btnClear');
    const btnSignUp = document.getElementById('btnSignUp');
    const confirmPassword = document.getElementById('confirmPassword');
    const btnAdd = document.getElementById('btnAdd');

    if (btnClear) {
      if (btnSignUp) {
        btnSignUp.setAttribute('disabled', '');
        confirmPassword.classList.remove('valid');
        confirmPassword.classList.remove('invalid');
      } else if (btnAdd) {
        btnAdd.setAttribute('disabled', '');
      }
    }
  }

  function checkValidity() {
    const btnSignIn = document.getElementById('btnSignIn');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnAdd = document.getElementById('btnAdd');
    const name = document.getElementById('userName');
    const surname = document.getElementById('userSurname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const filmTitle = document.getElementById('filmTitle');
    const filmOverview = document.getElementById('filmOverview');
    const filmPosterPath = document.getElementById('filmPosterPath');
    const filmPopularity = document.getElementById('filmPosterPath');
    const filmReleaseDate = document.getElementById('filmReleaseDate');
    const filmGenres = document.getElementById('filmGenres');
    const filmVoteAverage = document.getElementById('filmVoteAverage');
    const filmVoteCount = document.getElementById('filmVoteCount');

    if (btnSignIn) {
      if (email.checkValidity() && password.checkValidity()) {
        btnSignIn.removeAttribute('disabled');
      } else {
        btnSignIn.setAttribute('disabled', '');
      }
    } else if (btnSignUp) {
      if (
        name.checkValidity() &&
        surname.checkValidity() &&
        password.checkValidity() &&
        email.checkValidity() &&
        password.value === confirmPassword.value
      ) {
        btnSignUp.removeAttribute('disabled');
      } else {
        btnSignUp.setAttribute('disabled', '');
      }
    } else if (btnAdd) {
      if (
        filmTitle.checkValidity() &&
        filmOverview.checkValidity() &&
        filmPosterPath.checkValidity() &&
        filmPopularity.checkValidity() &&
        filmReleaseDate.checkValidity() &&
        filmGenres.checkValidity() &&
        filmVoteAverage.checkValidity() &&
        filmVoteCount.checkValidity()
      ) {
        btnAdd.removeAttribute('disabled');
      } else {
        btnAdd.setAttribute('disabled', '');
      }
    }
  }

  function checkPasswordsMatch() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (confirmPassword.value === password.value && confirmPassword.value !== '') {
      confirmPassword.classList.remove('invalid');
      confirmPassword.classList.add('valid');
    } else if (confirmPassword.value !== '') {
      confirmPassword.classList.remove('valid');
      confirmPassword.classList.add('invalid');
    } else {
      confirmPassword.classList.remove('valid');
      confirmPassword.classList.remove('invalid');
    }
  }

  function goToAddFilm(e) {
    const btnAddFilm = e.target.closest('.btn-add_film');

    if (btnAddFilm) {
      gallery.setAttribute('hidden', '');

      const pageContent = `
      <section class="add_film">
        <div class="add_film__content">
          <h1 class="add_film__content__title">Add Film</h1>
          <form id="addFilmForm" class="add_film__content__form">
            <div>
              <input type="text" id="filmTitle" name="filmTitle" minlength="3" placeholder="title" autocomplete="off" required />
              <label for="filmTitle">title</label>
              <p class="requirements">At least 3 characters.</p>
            </div>
            <div>
              <textarea type="text" id="filmOverview" name="filmOverview" minlength="6"
              maxlength="150" placeholder="overview" required></textarea>
              <label for="filmOverview">overview</label>
              <p class="requirements">At least 6 characters and no more than 150.</p>
            </div>
            <div>
              <input type="text" id="filmPosterPath" name="filmPosterPath" placeholder="poster_path" required />
              <label for="filmPosterPath">poster_path</label>
            </div>
            <div>
              <input type="number" id="filmPopularity" name="filmPopularity" placeholder="popularity" autocomplete="off" min="0" step="0.001" required />
              <label for="filmPopularity">popularity</label>
              <p class="requirements">Any positive number (no more than 3 characters after the places).</p>
            </div>
            <div>
              <input type="date" id="filmReleaseDate" name="filmReleaseDate" required />
              <label for="filmReleaseDate">release_date</label>
            </div>
            <div>
              <select id="filmGenres" name="filmGenres" size="4" multiple required>
              </select>
              <label for="filmGenres">genres</label>
            </div>
            <div>
              <input type="number" id="filmVoteAverage" name="filmVoteAverage" placeholder="vote_average" min="0" max="10" step="0.01" required />
              <label for="filmVoteAverage">vote_average</label>
              <p class="requirements">Any positive number from 0 to 10 (no more than 2 decimal places).</p>
            </div>
            <div>
              <input type="number" id="filmVoteCount" name="filmVoteCount" placeholder="vote_count" min="0" required />
              <label for="filmVoteCount">vote_count</label>
              <p class="requirements">Any positive non-fractional number.</p>
            </div>
            <div>
              <input type="checkbox" id="filmAgeRestrictions" name="filmAgeRestrictions" />
              <label for="filmAgeRestrictions">adult</label>
            </div>
            <div class="message">
              <span hidden>Film added successfully!</span>
              <span hidden></span>
            </div>
          </form>
          <div class="add_film__content__buttons">
            <button form="addFilmForm" id="btnAdd" class="btn btn--primary" aria-label="Add" disabled>Add</button>
            <button form="addFilmForm" id="btnClear" class="btn btn--secondary" type="reset" aria-label="Clear">
            Clear</button>
          </div>
        </div>
      </section>
    `;
      content.insertAdjacentHTML('beforeend', pageContent);
      getGenres();

      const addFilm = document.querySelector('.add_film');
      addFilm.addEventListener('input', checkValidity);
      addFilm.addEventListener('submit', addFilmToGallary);
      addFilm.addEventListener('click', clearForm);
    }
  }

  function addFilmToGallary(e) {
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
    const urlFilms = `https://api.themoviedb.org/3/discover/movie?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=${store.language}&sort_by=${store.sortBy}&page=${store.numberPage}&vote_count.gte=10`;
    const fetchFilms = fetch(urlFilms);

    fetchFilms
      .then((response) => response.json())
      .then((films) => {
        let galleryContent = '';
        const galleryContainer = document.querySelector('.gallery__container');

        films.results.forEach((f) => {
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
        });

        galleryContainer.innerHTML = galleryContent;
        addAdministrationFunctions();
      });
    visiblePagination();
  }

  function getGenres() {
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

  function getFilm(e) {
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
            <section class="film">
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

  function sortFilms(e) {
    if (e.target.value === 'none_sort') {
      store.sortBy = 'popularity.desc';
    } else if (e.target.value === 'vote_rating_down') {
      store.sortBy = 'vote_average.desc';
    } else if (e.target.value === 'vote_rating_up') {
      store.sortBy = 'vote_average.asc';
    } else if (e.target.value === 'release_date_down') {
      store.sortBy = 'primary_release_date.desc';
    } else if (e.target.value === 'release_date_up') {
      store.sortBy = 'primary_release_date.asc';
    }

    goToHomepage();
    getFilms();
  }

  header.addEventListener('click', applicationControl);
  content.addEventListener('click', getFilm);
  content.addEventListener('click', goToAddFilm);
  sort.addEventListener('change', sortFilms);
  pagination.addEventListener('click', switchPage);
});
