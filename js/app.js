'use strict';

const inputs = document.querySelectorAll('input');
const formControl = document.querySelectorAll('.main__control');
const cardName = document.querySelector('#name');
const cardNumber = document.querySelector('#number');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const cvc = document.querySelector('#cvc');
const btn = document.querySelector('#btn');

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
  // initialize countErr value of zero
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

const init = e => {
  e.preventDefault();

  getCheckValue([cardName, cardNumber, month, year, cvc]);
  getValidName(cardName);
  getValidNumber(cardNumber, 16);
  getValidDate(month, 12, 0);
  getValidDate(year, 50, 0);
  getValidCVC(cvc, 3);

  // The is isValid contain a value by the returned of this function(isFormValid)
  const isValid = isFormValid();

  // Check if return value is equal to 5 (5 - means all the input has no error)
  if (isValid === 5) {
    console.log('form complete');

    // Loop through the input and clear all the value
    for (const el of inputs) {
      el.value = '';
    }
  } else {
    console.log('form not complete');
  }
};

btn.addEventListener('click', init);

// const cardName = document.querySelector('#card-name');
// const cardNumber = document.querySelector('#card-number');
// const month = document.querySelector('#month');
// const year = document.querySelector('#year');
// const cvc = document.querySelector('#cvc');
// const form = document.querySelector('#form');
// const complete = document.querySelector('#complete');

// const cFNum = document.querySelector('.card__number');
// const cBNum = document.querySelector('.card__back--number');
// const cName = document.querySelector('.card__name');
// const cMonth = document.querySelector('.card__month');
// const cYear = document.querySelector('.card__year');

// const formControl = document.querySelectorAll('.form__input--control');

// // Validate the form inputs
// const isFormValid = () => {
//   for (const el of formControl) {
//     if (el.classList.contains('error')) {
//       return el.classList.contains('error');
//     }
//   }
// };

// // Update the card if input is valid
// const getUpdateCard = (input, cards) => {
//   if (cards.length > 1) {
//     cards.forEach(card => {
//       if (card.className === input.className) {
//         card.textContent = input.value;
//       } else {
//         return;
//       }
//     });
//   } else {
//     if (cards.className === input.className) {
//       cards.textContent = input.value;
//     }
//   }
// };

// // Show error
// const displayError = (input, errorMessage) => {
//   const inputContainer = input.parentElement;
//   inputContainer.className = 'form__input--control error';
//   const small = inputContainer.querySelector('small');
//   small.textContent = errorMessage;
// };

// // Show success
// const displaySuccess = (input, cards) => {
//   const inputContainer = input.parentElement;
//   inputContainer.className = 'form__input--control success';

//   getUpdateCard(input, cards);
// };

// // Validate cvc number
// const getCvcNumber = (cvc, min, max, bnumber) => {
//   if (cvc.value === '') return;

//   if (cvc.value.trim().length < min || cvc.value.trim().length > max) {
//     displayError(cvc, 'must contain 3 digits');
//   } else {
//     displaySuccess(cvc, bnumber);
//   }
// };

// // Validate exp date
// const getExpDate = (input, max, cdate) => {
//   if (input.value === '') return;

//   if (input.value.length > max) {
//     displayError(input, 'only 2 digits');
//   } else {
//     displaySuccess(input, cdate);
//   }
// };

// // Check if the card number is valid
// const getCardNumberValid = (input, max, fnumber) => {
//   const numCheck = '/^[0-9]+$/';

//   if (input.value === '') return;

//   if (input.value.trim().length < max) {
//     displayError(input, 'must contain 16 digits');
//   } else if (input.value.match(numCheck)) {
//     displayError(input, 'Wrong format, numbers only');
//   } else {
//     displaySuccess(input, fnumber);
//   }
// };

// // Check if the value is empty
// const getCheckValue = (input, cards) => {
//   input.forEach(userInput => {
//     if (userInput.value.trim() === '') {
//       displayError(userInput, "Can't be blank");
//     } else {
//       displaySuccess(userInput, cards);
//     }
//   });
// };

// const init = () => {
//   getCheckValue(
//     [cardName, cardNumber, month, year, cvc],
//     [cFNum, cBNum, cName, cMonth, cYear]
//   );
//   getCardNumberValid(cardNumber, 16, cFNum);
//   getExpDate(month, 2, cMonth);
//   getExpDate(year, 2, cYear);
//   getCvcNumber(cvc, 3, 3, cBNum);
// };

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   init();

//   const isValid = isFormValid();

//   if (isValid === undefined) {
//     form.classList.add('hidden');
//     complete.classList.remove('hidden');
//   } else {
//     form.classList.remove('hidden');
//     complete.classList.add('hidden');
//   }
// });
