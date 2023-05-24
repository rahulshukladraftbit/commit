import React from 'react';

const isEmptyString = inputString => {
  if (
    inputString === '' ||
    inputString === undefined ||
    inputString === null ||
    inputString.length === 0
  ) {
    //console.log("true")
    return true;
  } else {
    //console.log("false")
    return false;
  }
};

export default isEmptyString;
