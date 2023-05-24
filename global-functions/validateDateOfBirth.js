import React from 'react';

const validateDateOfBirth = dateOfBirth => {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (dateOfBirth.match(regEx) === null) return false; // Invalid format
  var d = new Date(dateOfBirth);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateOfBirth;
};

export default validateDateOfBirth;
