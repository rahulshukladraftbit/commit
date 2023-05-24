import React from 'react';

const isNotEmptyString = inputString => {
  if (
    inputString === '' ||
    inputString === undefined ||
    inputString === null ||
    inputString.length === 0
  ) {
    //console.log("false")
    return false;
  } else {
    //console.log("true")
    return true;
  }
};

export default isNotEmptyString;
