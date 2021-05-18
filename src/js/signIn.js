/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import { authorizedUser, gallery, store } from './app';
import addAdministrationFunctions from './addAdministrationFunctions';
import checkAuthorizedUser from './checkAuthorizedUser';
import savedData from './savedData';

export default function signIn(e) {
  const signInUp = document.querySelector('.sign_in_up');
  const message = document.querySelector('.message');
  const messageSuccess = document.querySelector('.message > span:first-child');
  const messageError = document.querySelector('.message > span:last-child');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const btnSignIn = document.getElementById('btnSignIn');

  if (e) {
    for (const user of store.users) {
      if (user.email.toLowerCase() === email.value.toLowerCase()) {
        if (user.password === password.value) {
          e.preventDefault();
          store.authorizedUser = user;
          checkAuthorizedUser();
          message.classList.add('message--visible');
          messageSuccess.removeAttribute('hidden');
          savedData();
          setTimeout(() => {
            signInUp.remove();
            gallery.removeAttribute('hidden');
            addAdministrationFunctions();
          }, 2000);
        } else {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    }
    if (!authorizedUser.textContent) {
      message.classList.add('message--visible');
      messageError.removeAttribute('hidden');
      setTimeout(() => {
        message.classList.remove('message--visible');
        email.value = '';
        password.value = '';
        messageError.setAttribute('hidden', '');
        btnSignIn.setAttribute('disabled', '');
      }, 2000);
    }
  }
}
