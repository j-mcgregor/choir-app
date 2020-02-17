const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateMemberInput(data) {
  const errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  // Title checks
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  // Body checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
