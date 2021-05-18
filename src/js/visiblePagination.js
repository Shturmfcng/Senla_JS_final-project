/* eslint-disable linebreak-style */

export default function visiblePagination() {
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
