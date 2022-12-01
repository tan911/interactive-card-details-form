'use strict';

const cardName = document.querySelector('#card-name');
const cardNumber = document.querySelector('#card-number');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const cvc = document.querySelector('#cvc');
const form = document.querySelector('#form');
const complete = document.querySelector('#complete');

const cFNum = document.querySelector('.card__number');
const cBNum = document.querySelector('.card__back--number');
const cName = document.querySelector('.card__name');
const cMonth = document.querySelector('.card__month');
const cYear = document.querySelector('.card__year');

const formControl = document.querySelectorAll('.form__input--control');

// Validate the form inputs
const isFormValid = () => {
  for (const el of formControl) {
    if (el.classList.contains('error')) {
      return el.classList.contains('error');
    }
  }
};

// Update the card if input is valid
const getUpdateCard = (input, cards) => {
  if (cards.length > 1) {
    cards.forEach(card => {
      if (card.className === input.className) {
        card.textContent = input.value;
      } else {
        return;
      }
    });
  } else {
    if (cards.className === input.className) {
      cards.textContent = input.value;
    }
  }
};

// Show error
const displayError = (input, errorMessage) => {
  const inputContainer = input.parentElement;
  inputContainer.className = 'form__input--control error';
  const small = inputContainer.querySelector('small');
  small.textContent = errorMessage;
};

// Show success
const displaySuccess = (input, cards) => {
  const inputContainer = input.parentElement;
  inputContainer.className = 'form__input--control success';

  getUpdateCard(input, cards);
};

// Validate cvc number
const getCvcNumber = (cvc, min, max, bnumber) => {
  if (cvc.value === '') return;

  if (cvc.value.trim().length < min || cvc.value.trim().length > max) {
    displayError(cvc, 'must contain 3 digits');
  } else {
    displaySuccess(cvc, bnumber);
  }
};

// Validate exp date
const getExpDate = (input, max, cdate) => {
  if (input.value === '') return;

  if (input.value.length > max) {
    displayError(input, 'only 2 digits');
  } else {
    displaySuccess(input, cdate);
  }
};

// Check if the card number is valid
const getCardNumberValid = (input, max, fnumber) => {
  const numCheck = '/^[0-9]+$/';

  if (input.value === '') return;

  if (input.value.trim().length < max) {
    displayError(input, 'must contain 16 digits');
  } else if (input.value.match(numCheck)) {
    displayError(input, 'Wrong format, numbers only');
  } else {
    displaySuccess(input, fnumber);
  }
};

// Check if the value is empty
const getCheckValue = (input, cards) => {
  input.forEach(userInput => {
    if (userInput.value.trim() === '') {
      displayError(userInput, "Can't be blank");
    } else {
      displaySuccess(userInput, cards);
    }
  });
};

const init = () => {
  getCheckValue(
    [cardName, cardNumber, month, year, cvc],
    [cFNum, cBNum, cName, cMonth, cYear]
  );
  getCardNumberValid(cardNumber, 16, cFNum);
  getExpDate(month, 2, cMonth);
  getExpDate(year, 2, cYear);
  getCvcNumber(cvc, 3, 3, cBNum);
};

form.addEventListener('submit', e => {
  e.preventDefault();
  init();

  const isValid = isFormValid();

  if (isValid === undefined) {
    form.classList.add('hidden');
    complete.classList.remove('hidden');
  } else {
    form.classList.remove('hidden');
    complete.classList.add('hidden');
  }
});
