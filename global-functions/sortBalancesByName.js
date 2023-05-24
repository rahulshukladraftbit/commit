import React from 'react';

const sortBalancesByName = inputArray => {
  return inputArray.sort((a, b) => (a.asset > b.asset ? 1 : -1));
};

export default sortBalancesByName;
