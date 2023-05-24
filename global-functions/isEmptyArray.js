import React from 'react';

const isEmptyArray = inputArray => {
  try {
    if (inputArray.length === 0) {
      return true;
    }
    return false;
  } catch (error) {
    return;
  }
};

export default isEmptyArray;
