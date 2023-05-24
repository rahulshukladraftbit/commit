import React from 'react';

const isEmptyObject = input => {
  if (input === null || input === undefined) {
    return;
  }

  length = Object.keys(input).length;

  if (length === 0) {
    //console.log("empty")
    return true;
  } else {
    //console.log("full")
    return false;
  }
};

export default isEmptyObject;
