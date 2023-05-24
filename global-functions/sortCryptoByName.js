import React from 'react';

const sortCryptoByName = inputArray => {
  return inputArray.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export default sortCryptoByName;
