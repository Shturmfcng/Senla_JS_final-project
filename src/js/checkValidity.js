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
  const filmTitle = document.getElementById('filmTitle');
  const filmOverview = document.getElementById('filmOverview');
  const filmPosterPath = document.getElementById('filmPosterPath');
  const filmPopularity = document.getElementById('filmPosterPath');
  const filmReleaseDate = document.getElementById('filmReleaseDate');
  const filmGenres = document.getElementById('filmGenres');
  const filmVoteAverage = document.getElementById('filmVoteAverage');
  const filmVoteCount = document.getElementById('filmVoteCount');

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
