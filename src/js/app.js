/* eslint-disable object-curly-newline */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */

import '../scss/app.scss';
import users from '../dummy_data/users.json';
import applicationControl from './applicationControl';
import checkAuthorizedUser from './checkAuthorizedUser';
import getFilm from './getFilm';
import goToAddFilm from './goToAddFilm';
import goToNumberPage from './goToNumberPage';
import sortFilms from './sortFilms';
import switchPage from './switchPage';

const fetch = require('node-fetch');

const authorizedUser = document.getElementById('authorizedUser');
const btnSignInUp = document.getElementById('btnSignInUp');
const content = document.getElementById('content');
const gallery = document.querySelector('.gallery');
const header = document.querySelector('.header');
const pagination = document.querySelector('.gallery__pagination');
const sort = document.querySelector('.gallery__sort > select');

let store = {
  users,
  authorizedUser: {},
  numberPage: '1',
  sortBy: 'popularity.desc',
  language: 'en-US',
};

document.addEventListener('DOMContentLoaded', function () {
  function loadData() {
    const data = localStorage.getItem('savedData');
    if (data) {
      store = JSON.parse(data);
    }
  }

  loadData();
  checkAuthorizedUser();
  goToNumberPage();

  header.addEventListener('click', applicationControl);
  content.addEventListener('click', getFilm);
  content.addEventListener('click', goToAddFilm);
  sort.addEventListener('change', sortFilms);
  pagination.addEventListener('click', switchPage);
});

export { authorizedUser, btnSignInUp, content, fetch, gallery, header, pagination, sort, store };
