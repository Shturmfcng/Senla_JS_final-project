/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */

import { gallery, store } from './app';
import savedData from './savedData';

export default function deleteFilm(e) {
  const binGallary = e.target.closest('.item--admin > .bin');
  const binFilm = e.target.closest('.film__admin > .bin');

  if (binGallary) {
    const filmId = binGallary.parentElement.previousElementSibling.id;
    store.deletedFilmsId.push(filmId);
    document.getElementById(filmId).parentElement.remove();
    savedData();
  } else if (binFilm) {
    const filmId = binFilm.closest('section:not([id=""])').id;
    store.deletedFilmsId.push(filmId);
    document.querySelector('.film').remove();
    gallery.removeAttribute('hidden');
    document.getElementById(filmId).parentElement.remove();
    savedData();
  }
}
