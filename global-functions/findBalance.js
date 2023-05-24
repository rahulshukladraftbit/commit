import React from 'react';

const findBalance = (Variables, inputAsset) => {
  let thisBalance;

  try {
    thisBalance = Variables.USER_BALANCES.find(
      element => element.asset === inputAsset
    ).balance;
  } catch (error) {
    thisBalance = 0;
  }

  return thisBalance;
};

export default findBalance;
