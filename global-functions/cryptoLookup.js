import React from 'react';

const cryptoLookup = (
  Variables,
  setGlobalVariableValue,
  cryptocurrency,
  literal
) => {
  const thisCryptoObject = Variables.CRYPTOCURRENCY_LIST.find(
    item => item.ticker === cryptocurrency
  );
  if (!thisCryptoObject) {
    return;
  } else if (literal === 'object') {
    return thisCryptoObject;
  } else {
    return thisCryptoObject[`${literal}`];
  }
};

export default cryptoLookup;
