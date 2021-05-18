/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */

import { authorizedUser, btnSignInUp, gallery, sort, store } from './app';
import addAdministrationFunctions from './addAdministrationFunctions';
import getFilms from './getFilms';
import goToHomepage from './goToHomepage';
import goToSignInUp from './goToSignInUp';
import savedData from './savedData';

export default function applicationControl(e) {
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
