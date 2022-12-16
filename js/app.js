'use strict';

const inputs = document.querySelectorAll('input');
const formControl = document.querySelectorAll('.main__control');
const cardName = document.querySelector('#name');
const cardNumber = document.querySelector('#number');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const cvc = document.querySelector('#cvc');
const btn = document.querySelector('#btn');

const mainNumber = document.querySelector('.main__card__number');
const mainName = document.querySelector('.main__card__name');
const mainMonth = document.querySelector('.main__month');
const mainYear = document.querySelector('.main__year');
const mainCvC = document.querySelector('.main__cvc');

// Validate the card name
const getValidName = input => {
  //
  // Check if the input is empty then terminate the function
  if (input.value === '') return;

  // Regex validation pattern for name
  const isValidName = /^[a-zA-Z]+ [a-zA-Z]+$/;

  // Check if the name does not match on those pattern
  if (!isValidName.test(input.value)) {
    displayError(input, 'Please enter your complete name');
  } else {
    displaySuccess(input);
  }
};

// Validate the card numbers
const getValidNumber = (input, max) => {
  //
  // Check if the input is empty then terminate the function
  if (input.value === '') return;

  // Regex validation pattern for numbers
  const isValidNumber = /^[0-9]+$/;

  // Replace function will remove all the whitespaces of input value
  // Then now, check the length of the input value with the given max value
  if (
    input.value.replace(/ /g, '').length > max ||
    input.value.replace(/ /g, '').length < max
  ) {
    displayError(input, 'Must contain 16 numbers');

    // Check if input value contains only numbers
  } else if (!isValidNumber.test(input.value.replace(/ /g, ''))) {
    displayError(input, 'Wrong format, numbers only');
  } else {
    displaySuccess(input);
  }
};

// Validate the dates
const getValidDate = (input, max, min) => {
  //
  // Check if the input is empty then terminate the function
  if (input.value === '') return;

  // Check if the input value valid for months(max) and minimum year(min)
  if (input.value > max || input.value < min) {
    displayError(input, 'Not a valid number');
  } else {
    displaySuccess(input);
  }
};

// Validate the cvc
const getValidCVC = (input, max) => {
  //
  // Check if the input is empty then terminate the function
  if (input.value === '') return;

  // Regex validation pattern for numbers
  const isValidNumber = /^[0-9]+$/;

  // Replace function will remove all the whitespaces of input value
  // Then now, check the length of the input value with the given max value
  if (
    input.value.replace(/ /g, '').length > max ||
    input.value.replace(/ /g, '').length < max
  ) {
    displayError(input, 'Must contain 3 digits');

    // Check if input value contains only numbers
  } else if (!isValidNumber.test(input.value.replace(/ /g, ''))) {
    displayError(input, 'Wrong format, numbers only');
  } else {
    displaySuccess(input);
  }
};

// show error
const displayError = (input, errorMessage) => {
  const inputContainer = input.parentElement;
  inputContainer.className = 'main__control error';
  const small = inputContainer.querySelector('small');

  // Show error in fieldset
  if (small === null) {
    const inputParentElement = inputContainer.parentElement;
    inputContainer.className = '';
    inputParentElement.className = 'main__control error';
    const small = inputParentElement.querySelector('small');
    small.textContent = errorMessage;
  } else {
    small.textContent = errorMessage;
  }
};

// show success
const displaySuccess = input => {
  const inputContainer = input.parentElement;
  inputContainer.className = 'main__control success';

  // apply only in fieldset
  const legend = document.querySelector('legend');
  const firstEl = legend.nextElementSibling;
  const secondEl = firstEl.nextElementSibling;

  // apply only in fieldset
  if (
    firstEl.classList.contains('success') &&
    secondEl.classList.contains('success')
  ) {
    const legendParentEl = legend.parentElement;
    legendParentEl.className = 'main__control success';
  }
};

// Validate if input value is empty
const getCheckValue = input => {
  input.forEach(userInput => {
    if (userInput.value.trim() === '') {
      displayError(userInput, "Can't be blank");
    } else {
      displaySuccess(userInput);
    }
  });
};

// Check if form is valid
const isFormValid = () => {
  // Initialize variable countErr value of zero
  let countErr = 0;

  // Loop through every input element
  inputs.forEach(input => {
    const el = input.parentElement;

    // Check if the input has class of 'success' equal to valid
    if (el.classList.contains('success')) {
      // Increment the countErr by 1
      countErr += 1;
    } else {
      // Decrement the countErr by 1
      countErr -= 1;
    }
  });

  // return countErr value
  return countErr;
};

// Update card in realtime
const updateCard = cards => {
  for (let i = 0; i < cards.length; i++) {
    for (let k = 0; k < cards.length; k++) {
      inputs[i].addEventListener('keyup', e => {
        if (inputs[i].className === cards[k].className) {
          cards[k].textContent = e.target.value;
        }
      });
    }
  }
};

// Update card  in realtime
updateCard([mainName, mainNumber, mainMonth, mainYear, mainCvC]);

// Show form
const showForm = () => {
  const form = document.querySelector('.main__forms');
  const complete = document.querySelector('.main__complete__form');
  form.classList.remove('hidden');
  complete.classList.add('hidden');
};

// Hide form
const hideForm = () => {
  const form = document.querySelector('.main__forms');
  const complete = document.querySelector('.main__complete__form');
  form.classList.add('hidden');
  complete.classList.remove('hidden');
};

const init = e => {
  e.preventDefault();

  getCheckValue([cardName, cardNumber, month, year, cvc]);
  getValidName(cardName);
  getValidNumber(cardNumber, 16);
  getValidDate(month, 12, 0);
  getValidDate(year, 50, 0);
  getValidCVC(cvc, 3);

  // isValid contain a value by the returned of this function(isFormValid)
  const isValid = isFormValid();

  // Check if return value is equal to 5 (5 - means all the input has no error)
  if (isValid === 5) {
    // Loop through the input and clear all the value
    for (const el of inputs) {
      el.value = '';
    }

    //  Hide form
    hideForm();
  } else {
    // Show the form
    showForm();
  }
};

btn.addEventListener('click', init);
