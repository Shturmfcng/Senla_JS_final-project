/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */

export default function checkValidity() {
  const btnSignIn = document.getElementById('btnSignIn');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnAdd = document.getElementById('btnAdd');
  const name = document.getElementById('userName');
  const surname = document.getElementById('userSurname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const filmTitle = document.getElementById('title');
  const filmOverview = document.getElementById('overview');
  const filmPosterPath = document.getElementById('poster_path');
  const filmPopularity = document.getElementById('popularity');
  const filmReleaseDate = document.getElementById('release_date');
  const filmGenres = document.getElementById('genres');
  const filmVoteAverage = document.getElementById('vote_average');
  const filmVoteCount = document.getElementById('vote_count');

  if (btnSignIn) {
    if (email.checkValidity() && password.checkValidity()) {
      btnSignIn.removeAttribute('disabled');
    } else {
      btnSignIn.setAttribute('disabled', '');
    }
  } else if (btnSignUp) {
    if (
      name.checkValidity() &&
      surname.checkValidity() &&
      password.checkValidity() &&
      email.checkValidity() &&
      password.value === confirmPassword.value
    ) {
      btnSignUp.removeAttribute('disabled');
    } else {
      btnSignUp.setAttribute('disabled', '');
    }
  } else if (btnAdd) {
    if (
      filmTitle.checkValidity() &&
      filmOverview.checkValidity() &&
      filmPosterPath.checkValidity() &&
      filmPopularity.checkValidity() &&
      filmReleaseDate.checkValidity() &&
      filmGenres.checkValidity() &&
      filmVoteAverage.checkValidity() &&
      filmVoteCount.checkValidity()
    ) {
      btnAdd.removeAttribute('disabled');
    } else {
      btnAdd.setAttribute('disabled', '');
    }
  }
}
