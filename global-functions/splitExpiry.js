import React from 'react';

const splitExpiry = (expiryDateInput, extractedPiece) => {
  const month = parseInt(expiryDateInput.substring(0, 2));
  const year = parseInt(expiryDateInput.substring(expiryDateInput.length - 2));

  if (extractedPiece === 'month') {
    return month;
  }
  if (extractedPiece === 'year') {
    return year;
  }
};

export default splitExpiry;
