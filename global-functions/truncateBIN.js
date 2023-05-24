import React from 'react';

// Truncate a card number to 6 digits
const truncateBIN = BIN => {
  return BIN.substring(0, 6);
};

export default truncateBIN;
