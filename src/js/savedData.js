/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
import { store } from './app';

export default function savedData() {
  localStorage.setItem('savedData', JSON.stringify(store));
}
