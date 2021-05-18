/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-cycle
import { store } from './app';

export default function addAdministrationFunctions() {
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
