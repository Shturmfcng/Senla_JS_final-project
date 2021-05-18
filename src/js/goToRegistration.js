/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
/* eslint-disable object-curly-newline */
import { content } from './app';
import checkPasswordsMatch from './checkPasswordsMatch';
import checkValidity from './checkValidity';
import clearForm from './clearForm';
import signUp from './signUp';

export default function goToRegistration(e) {
  const btnRegistration = e.target.closest('#btnRegistration');
  const signInUp = document.querySelector('.sign_in_up');

  if (btnRegistration) {
    signInUp.remove();
    const pageContent = `
      <section class="registration">
        <div class="registration__content">
          <h1 class="registration__content__title">Registration</h1>
          <form id="registrationForm" class="registration__content__form">
            <div>
              <input type="text" id="userName" name="userName" minlength="6" placeholder="Name" required />
              <label for="userName">Name</label>
              <p class="requirements">The name must be at least 6 characters long.</p>
            </div>
            <div>
              <input type="text" id="userSurname" name="userSurname" minlength="6" placeholder="Surname" required />
              <label for="userSurname">Surname</label>
              <p class="requirements">The surname must be at least 6 characters long.</p>
            </div>
            <div>
              <input type="password" id="password" name="password" minlength="6"
              placeholder="Password" required />
              <label for="password">Password</label>
              <p class="requirements">The password must be at least 6 characters long.</p>
            </div>
            <div>
              <input type="password" id="confirmPassword" name="confirm-password" minlength="6"
              placeholder="Confirm Password" required />
              <label for="confirmPassword">Confirm Password</label>
              <p class="requirements">You entered two different passwords. Please try again.</p>
            </div>
            <div>
              <input type="email" id="email" name="email" placeholder="Email" required />
              <label for="email">Email</label>
              <p class="requirements">The email address must contain the "@" symbol.</p>
            </div>
            <div class="message">
              <span hidden>Registration completed successfully!</span>
              <span hidden>A user with this Email already registered!</span>
            </div>
          </form>
          <div class="registration__content__buttons">
            <button form="registrationForm" id="btnSignUp" class="btn btn--primary" aria-label="Sign Up" disabled>
            Sign Up</button>
            <button form="registrationForm" id="btnClear" class="btn btn--secondary" type="reset" aria-label="Clear">
            Clear</button>
          </div>
        </div>
      </section>
      `;
    content.insertAdjacentHTML('beforeend', pageContent);

    const registration = document.querySelector('.registration');
    registration.addEventListener('input', checkValidity);
    registration.addEventListener('input', checkPasswordsMatch);
    registration.addEventListener('submit', signUp);
    registration.addEventListener('click', clearForm);
  }
}
