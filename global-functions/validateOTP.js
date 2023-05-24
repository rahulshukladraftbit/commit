import React from 'react';

const validateOTP = otp => {
  if (otp.length === 6) {
    return true;
  } else {
    return false;
  }
};

export default validateOTP;
