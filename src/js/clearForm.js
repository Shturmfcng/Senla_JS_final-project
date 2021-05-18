/* eslint-disable linebreak-style */

export default function clearForm(e) {
  const btnClear = e.target.closest('#btnClear');
  const btnSignUp = document.getElementById('btnSignUp');
  const confirmPassword = document.getElementById('confirmPassword');
  const btnAdd = document.getElementById('btnAdd');

  if (btnClear) {
    if (btnSignUp) {
      btnSignUp.setAttribute('disabled', '');
      confirmPassword.classList.remove('valid');
      confirmPassword.classList.remove('invalid');
    } else if (btnAdd) {
      btnAdd.setAttribute('disabled', '');
    }
  }
}
