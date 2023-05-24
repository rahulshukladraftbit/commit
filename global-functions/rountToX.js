import React from 'react';

const rountToX = (input, places) => {
  const inputFloat = parseFloat(input);

  return String(inputFloat.toFixed(places));
};

export default rountToX;
