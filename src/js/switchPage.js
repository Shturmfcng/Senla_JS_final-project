/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */

import goToNumberPage from './goToNumberPage';

export default function switchPage(e) {
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
  goToNumberPage();
}
