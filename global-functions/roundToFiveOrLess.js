import React from 'react';

const roundToFiveOrLess = input => {
  function countDecimals(input) {
    inputFloat = parseFloat(input);

    if (Math.floor(inputFloat.valueOf()) === inputFloat.valueOf()) return 0;

    if (input.indexOf('.') !== -1 && input.indexOf('-') !== -1) {
      return input.split('-')[1] || 0;
    } else if (input.indexOf('.') !== -1) {
      return input.split('.')[1].length || 0;
    }
    return input.split('-')[1] || 0;
  }

  const decimalCount = countDecimals(input);

  if (decimalCount <= 5) {
    return input;
  } else {
    return String(parseFloat(input).toFixed(5));
  }
};

export default roundToFiveOrLess;
