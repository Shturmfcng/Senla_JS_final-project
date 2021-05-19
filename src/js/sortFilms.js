/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import { store } from './app';
import goToHomepage from './goToHomepage';
import getFilms from './getFilms';

export default function sortFilms(e) {
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
