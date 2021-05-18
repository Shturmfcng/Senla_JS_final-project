/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-cycle
import { store, authorizedUser, btnSignInUp } from './app';

export default function checkAuthorizedUser() {
  if (!store.authorizedUser.name === false) {
    authorizedUser.textContent = store.authorizedUser.name;
    btnSignInUp.textContent = 'Log Out';
  } else {
    btnSignInUp.textContent = 'Sign In / Sign Up';
  }
}
