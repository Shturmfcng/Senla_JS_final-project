/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import { store } from './app';

export default function goToHomepage() {
  const pages = document.querySelectorAll('.number-page');
  store.numberPage = '1';
  document.querySelector('#activePage').removeAttribute('id');
  pages[0].parentElement.setAttribute('id', 'activePage');
}
