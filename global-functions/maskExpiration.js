import React from 'react';

const maskExpiration = (inputExpiration, oldInput) => {
  //Check if this is a backspace
  if (inputExpiration.length < oldInput.length) {
    if (inputExpiration.length === 2) {
      return inputExpiration.slice(0, -1);
    } else {
      return inputExpiration;
    }
  }

  //If adding to the input - mask it!
  else {
    inputExpiration = inputExpiration
      .replace(/^([1-9]\/|[2-9])$/g, '0$1/')
      .replace(/^(0[1-9]|1[0-2])$/g, '$1/')
      .replace(/^([0-1])([3-9])$/g, '0$1/$2')
      .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2')
      .replace(/^([0]+)\/|[0]+$/g, '0')
      .replace(/[^\d\/]|^[\/]*$/g, '')
      .replace(/\/\//g, '/');

    return inputExpiration;
  }
};

export default maskExpiration;
