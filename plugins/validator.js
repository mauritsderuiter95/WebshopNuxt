/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import {
  required, email, digits, min, required_if, is,
} from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Verplicht',
});

extend('email', {
  ...email,
  message: 'Incorrect e-mailadres',
});

extend('digits', {
  ...digits,
  message: 'Incorrect telefoonnummer',
});

extend('min', {
  ...min,
  message: 'Wachtwoord te kort',
});

extend('required_if', {
  ...required_if,
  message: 'Is required',
});

extend('is', {
  ...is,
  message: 'Incorrect wachtwoord',
});

Vue.component('ValidationProvider', ValidationProvider);
