/* eslint-disable no-undef */
/* eslint-disable no-alert */
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

  const store = { users, authorizedUser: {} };

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

  function applicationControl(e) {
    const btnHomepage = e.target.closest('.btn-return_homepage');
    const btnSignInUp = e.target.closest('#btnSignInUp');
    const film = document.querySelector('.film');
    const signInUp = document.querySelector('.sign_in_up');
    const registration = document.querySelector('.registration');
    const authorizedUser = document.getElementById('authorizedUser');

    if (btnHomepage) {
      if (document.querySelectorAll('section').length === 1) {
        sort.selectedIndex = 0;
        sortBy = 'popularity.desc';
        goToHomepage();
      }
      gallery.removeAttribute('hidden');
      getFilms();
      if (film) {
        film.remove();
      } else if (signInUp) {
        signInUp.remove();
      } else if (registration) {
        registration.remove();
      }
    } else if (btnSignInUp) {
      if (!authorizedUser.textContent === false) {
        authorizedUser.textContent = '';
        store.authorizedUser = {};
        document.getElementById('btnSignInUp').textContent = 'Sign In / Sign Up';
        addAdministrationFunctions();
        console.log(store);
      } else if (!signInUp) {
        gallery.setAttribute('hidden', '');
        if (film) {
          film.remove();
        } else if (registration) {
          registration.remove();
        }
        goToSignInUp();
      }
    }
  }

  function goToHomepage() {
    const pages = document.querySelectorAll('.number-page');
    numberPage = '1';
    document.querySelector('#activePage').removeAttribute('id');
    pages[0].parentElement.setAttribute('id', 'activePage');
  }

  function goToSignInUp() {
    const pageContent = `
      <section class="sign_in_up">
        <div class="sign_in_up__content">
          <h1 class="sign_in_up__content__title">Sign In</h1>
          <form id="signInForm" class="sign_in_up__content__form">
            <div class="form--email">
              <input type="email" id="email" name="email" placeholder="Email" required />
              <label for="email">Email</label>
              <p class="requirements">The email address must contain the "@" symbol.</p>
            </div>
            <div class="form--password">
              <input type="password" id="password" name="password" minlength="6"
              placeholder="Password" required />
              <label for="password">Password</label>
              <p class="requirements">The password must be at least 6 characters long.</p>
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
    signInUp.addEventListener('submit', SignIn);
    signInUp.addEventListener('click', goToRegistration);
  }

  function SignIn(e) {
    const signInUp = document.querySelector('.sign_in_up');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const authorizedUser = document.getElementById('authorizedUser');
    const btnSignInUp = document.getElementById('btnSignInUp');

    if (e) {
      for (const user of store.users) {
        if (user.email.toLowerCase() === email.value.toLowerCase()) {
          if (user.password === password.value) {
            e.preventDefault();
            alert('Вы успешно авторизовались!');
            signInUp.remove();
            gallery.removeAttribute('hidden');
            store.authorizedUser = user;
            authorizedUser.textContent = user.name;
            btnSignInUp.textContent = 'Log Out';
            addAdministrationFunctions();
            console.log(store);
          } else {
            e.preventDefault();
          }
        } else {
          e.preventDefault();
        }
      }
      if (!authorizedUser.textContent) {
        alert('Email или Password введены не верно!');
      }
    }
  }

  function addAdministrationFunctions() {
    const btnAddFilm = document.querySelector('.btn-add_film');
    const bins = document.querySelectorAll('.bin');
    const pencil = document.querySelector('.pencil');

    if (store.authorizedUser.isAdmin === true) {
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
            <div class="form--name">
              <input type="text" id="userName" name="userName" minlength="6" placeholder="Name" required />
              <label for="userName">Name</label>
              <p class="requirements">The name must be at least 6 characters long.</p>
            </div>
            <div class="form--surname">
              <input type="text" id="userSurname" name="userSurname" minlength="6" placeholder="Surname" required />
              <label for="userSurname">Surname</label>
              <p class="requirements">The surname must be at least 6 characters long.</p>
            </div>
            <div class="form--password">
              <input type="password" id="password" name="password" minlength="6"
              placeholder="Password" required />
              <label for="password">Password</label>
              <p class="requirements">The password must be at least 6 characters long.</p>
            </div>
            <div class="form--confirm-password">
              <input type="password" id="confirmPassword" name="confirm-password" minlength="6"
              placeholder="Confirm Password" required />
              <label for="confirmPassword">Confirm Password</label>
              <p class="requirements">You entered two different passwords. Please try again.</p>
            </div>
            <div class="form--email">
              <input type="email" id="email" name="email" placeholder="Email" required />
              <label for="email">Email</label>
              <p class="requirements">The email address must contain the "@" symbol.</p>
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
    const name = document.getElementById('userName');
    const surname = document.getElementById('userSurname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const registration = document.querySelector('.registration');
    const authorizedUser = document.getElementById('authorizedUser');
    const btnSignInUp = document.getElementById('btnSignInUp');

    if (e && !store.users.find((user) => user.email.toLowerCase() === email.value.toLowerCase())) {
      e.preventDefault();
      alert('Вы успешно зарегистрировались!');
      registration.remove();
      gallery.removeAttribute('hidden');
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
      console.log(store);
    } else {
      e.preventDefault();
      alert('Пользователь с таким Email уже зарегистрирован!');
    }
  }

  function clearForm(e) {
    const btnSignUp = document.getElementById('btnSignUp');
    const btnClear = e.target.closest('#btnClear');
    const confirmPassword = document.getElementById('confirmPassword');

    if (btnClear) {
      btnSignUp.setAttribute('disabled', '');
      confirmPassword.classList.remove('valid');
      confirmPassword.classList.remove('invalid');
    }
  }

  function checkValidity() {
    const btnSignIn = document.getElementById('btnSignIn');
    const btnSignUp = document.getElementById('btnSignUp');
    const name = document.getElementById('userName');
    const surname = document.getElementById('userSurname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

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
    url = `https://api.themoviedb.org/3/discover/movie?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=${language}&sort_by=${sortBy}&page=${numberPage}&vote_count.gte=10`;
    const fetchFilms = fetch(url);

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

  function getFilm(e) {
    const item = e.target.closest('.item');

    if (item) {
      gallery.setAttribute('hidden', '');
      const filmId = item.getAttribute('id');

      url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=ec929a3499d8d5db225c5dbcaa0e1607&language=${language}`;

      const fetchFilm = fetch(url);
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
      sortBy = 'popularity.desc';
    } else if (e.target.value === 'vote_rating_down') {
      sortBy = 'vote_average.desc';
    } else if (e.target.value === 'vote_rating_up') {
      sortBy = 'vote_average.asc';
    } else if (e.target.value === 'release_date_down') {
      sortBy = 'primary_release_date.desc';
    } else if (e.target.value === 'release_date_up') {
      sortBy = 'primary_release_date.asc';
    }

    goToHomepage();
    getFilms();
  }

  header.addEventListener('click', applicationControl);
  content.addEventListener('click', getFilm);
  sort.addEventListener('change', sortFilms);
  pagination.addEventListener('click', switchPage);
});
