import React from 'react';

const combineFees = (Variables, processingFee, nobaFee, networkFee) => {
  if (Variables.isSelfCustody) {
    totalFee =
      parseFloat(processingFee) + parseFloat(nobaFee) + parseFloat(networkFee);
  } else {
    totalFee = parseFloat(processingFee) + parseFloat(nobaFee);
  }

  return totalFee.toFixed(2);
};

export default combineFees;
