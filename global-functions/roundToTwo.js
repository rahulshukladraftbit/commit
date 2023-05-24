import React from 'react';

const roundToTwo = input => {
  if (input === undefined || input === null || input === 0) {
    return '0.00';
  } else {
    return String(input.toFixed(2));
  }
};

export default roundToTwo;
