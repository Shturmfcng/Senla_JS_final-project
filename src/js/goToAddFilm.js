/* eslint-disable linebreak-style */
import { content, gallery } from './app';
import addFilmToGallary from './addFilmToGallary';
import checkValidity from './checkValidity';
import clearForm from './clearForm';
import getGenres from './getGenres';

export default function goToAddFilm(e) {
  const btnAddFilm = e.target.closest('.btn-add_film');

  if (btnAddFilm) {
    gallery.setAttribute('hidden', '');

    const pageContent = `
      <section class="add_film">
        <div class="add_film__content">
          <h1 class="add_film__content__title">Add Film</h1>
          <form id="addFilmForm" class="add_film__content__form">
            <div>
              <input type="text" id="filmTitle" name="filmTitle" minlength="3" placeholder="title" autocomplete="off" required />
              <label for="filmTitle">title</label>
              <p class="requirements">At least 3 characters.</p>
            </div>
            <div>
              <textarea type="text" id="filmOverview" name="filmOverview" minlength="6"
              maxlength="150" placeholder="overview" required></textarea>
              <label for="filmOverview">overview</label>
              <p class="requirements">At least 6 characters and no more than 150.</p>
            </div>
            <div>
              <input type="text" id="filmPosterPath" name="filmPosterPath" placeholder="poster_path" required />
              <label for="filmPosterPath">poster_path</label>
            </div>
            <div>
              <input type="number" id="filmPopularity" name="filmPopularity" placeholder="popularity" autocomplete="off" min="0" step="0.001" required />
              <label for="filmPopularity">popularity</label>
              <p class="requirements">Any positive number (no more than 3 characters after the places).</p>
            </div>
            <div>
              <input type="date" id="filmReleaseDate" name="filmReleaseDate" required />
              <label for="filmReleaseDate">release_date</label>
            </div>
            <div>
              <select id="filmGenres" name="filmGenres" size="4" multiple required>
              </select>
              <label for="filmGenres">genres</label>
            </div>
            <div>
              <input type="number" id="filmVoteAverage" name="filmVoteAverage" placeholder="vote_average" min="0" max="10" step="0.01" required />
              <label for="filmVoteAverage">vote_average</label>
              <p class="requirements">Any positive number from 0 to 10 (no more than 2 decimal places).</p>
            </div>
            <div>
              <input type="number" id="filmVoteCount" name="filmVoteCount" placeholder="vote_count" min="0" required />
              <label for="filmVoteCount">vote_count</label>
              <p class="requirements">Any positive non-fractional number.</p>
            </div>
            <div>
              <input type="checkbox" id="filmAgeRestrictions" name="filmAgeRestrictions" />
              <label for="filmAgeRestrictions">adult</label>
            </div>
            <div class="message">
              <span hidden>Film added successfully!</span>
              <span hidden></span>
            </div>
          </form>
          <div class="add_film__content__buttons">
            <button form="addFilmForm" id="btnAdd" class="btn btn--primary" aria-label="Add" disabled>Add</button>
            <button form="addFilmForm" id="btnClear" class="btn btn--secondary" type="reset" aria-label="Clear">
            Clear</button>
          </div>
        </div>
      </section>
    `;
    content.insertAdjacentHTML('beforeend', pageContent);
    getGenres();

    const addFilm = document.querySelector('.add_film');
    addFilm.addEventListener('input', checkValidity);
    addFilm.addEventListener('submit', addFilmToGallary);
    addFilm.addEventListener('click', clearForm);
  }
}
