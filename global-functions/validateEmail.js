import React from 'react';

const validateEmail = emailInput => {
  emailValidation = emailInput.match(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );

  if (emailValidation) {
    return true;
  } else {
    return false;
  }
};

export default validateEmail;
