/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
/* eslint-disable object-curly-newline */
import { authorizedUser, btnSignInUp, gallery, store } from './app';
import savedData from './savedData';

export default function signUp(e) {
  const message = document.querySelector('.message');
  const messageSuccess = document.querySelector('.message > span:first-child');
  const messageError = document.querySelector('.message > span:last-child');
  const name = document.getElementById('userName');
  const surname = document.getElementById('userSurname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const registration = document.querySelector('.registration');
  const registrationForm = document.getElementById('registrationForm');
  const btnSignUp = document.getElementById('btnSignUp');

  if (e && !store.users.find((user) => user.email.toLowerCase() === email.value.toLowerCase())) {
    e.preventDefault();
    const user = {
      name: name.value,
      surname: surname.value,
      password: password.value,
      email: email.value,
      isAdmin: false,
    };
    authorizedUser.textContent = user.name;
    btnSignInUp.textContent = 'Log Out';
    store.authorizedUser = user;
    store.users.push(user);
    message.classList.add('message--visible');
    messageSuccess.removeAttribute('hidden');
    savedData();
    setTimeout(() => {
      registration.remove();
      gallery.removeAttribute('hidden');
    }, 2000);
  } else {
    e.preventDefault();
    message.classList.add('message--visible');
    messageError.removeAttribute('hidden');
    setTimeout(() => {
      message.classList.remove('message--visible');
      registrationForm.reset();
      messageError.setAttribute('hidden', '');
      btnSignUp.setAttribute('disabled', '');
      confirmPassword.classList.remove('valid');
      confirmPassword.classList.remove('invalid');
    }, 2000);
  }
}
