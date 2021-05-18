/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import { store } from './app';
import getFilms from './getFilms';

export default function goToNumberPage() {
  const activePage = document.getElementById('activePage');
  store.numberPage = activePage.textContent;
  getFilms();
}
