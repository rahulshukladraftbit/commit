import React from 'react';

const maskWallet = inputAddress => {
  return (
    inputAddress.substring(0, 4) +
    '...' +
    inputAddress.substring(inputAddress.length - 4)
  );
};

export default maskWallet;
