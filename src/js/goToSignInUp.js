/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import { content } from './app';
import checkValidity from './checkValidity';
import goToRegistration from './goToRegistration';
import signIn from './signIn';

export default function goToSignInUp() {
  const pageContent = `
      <section class="sign_in_up">
        <div class="sign_in_up__content">
          <h1 class="sign_in_up__content__title">Sign In</h1>
          <form id="signInForm" class="sign_in_up__content__form">
            <div>
              <input type="email" id="email" name="email" placeholder="Email" required />
              <label for="email">Email</label>
              <p class="requirements">The email address must contain the "@" symbol.</p>
            </div>
            <div>
              <input type="password" id="password" name="password" minlength="6"
              placeholder="Password" required />
              <label for="password">Password</label>
              <p class="requirements">The password must be at least 6 characters long.</p>
            </div>
            <div class="message">
              <span hidden>Authorization was successful!</span>
              <span hidden>Email or Password entered incorrectly!</span>
            </div>
          </form>
          <div class="sign_in_up__content__buttons">
            <button form="signInForm" id="btnSignIn" class="btn btn--primary" aria-label="Sign In" disabled>Sign In</button>
            <a id="btnRegistration" class="btn btn--primary" href="#" role="button" aria-label="Registration">Registration</a>
          </div>
        </div>
      </section>
    `;
  content.insertAdjacentHTML('beforeend', pageContent);

  const signInUp = document.querySelector('.sign_in_up');
  signInUp.addEventListener('input', checkValidity);
  signInUp.addEventListener('submit', signIn);
  signInUp.addEventListener('click', goToRegistration);
}
