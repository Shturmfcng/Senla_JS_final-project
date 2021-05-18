/* eslint-disable linebreak-style */

export default function checkPasswordsMatch() {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  if (confirmPassword.value === password.value && confirmPassword.value !== '') {
    confirmPassword.classList.remove('invalid');
    confirmPassword.classList.add('valid');
  } else if (confirmPassword.value !== '') {
    confirmPassword.classList.remove('valid');
    confirmPassword.classList.add('invalid');
  } else {
    confirmPassword.classList.remove('valid');
    confirmPassword.classList.remove('invalid');
  }
}
