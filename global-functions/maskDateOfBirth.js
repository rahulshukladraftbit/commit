import React from 'react';

const maskDateOfBirth = (dateOfBirth, oldDateOfBirth) => {
  if (dateOfBirth < oldDateOfBirth) {
    if (dateOfBirth.length === 4 || dateOfBirth.length === 7) {
      return dateOfBirth.slice(0, -1);
    } else {
      return dateOfBirth;
    }
  }

  if (dateOfBirth.match(/^\d{4}$/) !== null) {
    dateOfBirth = dateOfBirth + '-';
  } else if (dateOfBirth.match(/^\d{4}\-\d{2}$/) !== null) {
    dateOfBirth = dateOfBirth + '-';
  }

  return dateOfBirth;
};

export default maskDateOfBirth;
